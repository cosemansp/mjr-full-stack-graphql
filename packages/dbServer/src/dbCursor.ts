/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable complexity */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import ejson from 'mongodb-extended-json';
import base64url from 'base64-url';
import { Document } from 'mongoose';

const DEFAULT_FIRST = 128;
const MAX_FIRST = 512;

export interface IPaginateOptions {
  query?: any;
  first?: number;
  after?: string;
  before?: string;
  paginatedField?: string;
  sortAscending?: boolean;
  transformResponse?: (data: Document[]) => Document[];
}

export interface IPaginateConnector<T> {
  query?: any;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  edges: [
    {
      cursor: string;
      node: T;
    },
  ];
}

//
// Find documents with paged result, easy to integrate with graphql connection api
// Inspired by https://github.com/mixmaxhq/mongo-cursor-pagination
//
export async function findPaginated<T>(Model, params: IPaginateOptions): Promise<IPaginateConnector<T>> {
  params = await sanitizeParams(params);
  const cursorQuery = generateCursorQuery(params);
  const sortExpression = generateSort(params);

  const query = { $and: [cursorQuery, params.query] };
  // console.log('query:', JSON.stringify(query, null, 2), 'sort:', sortExpression);
  const results: Document[] = await Model.find(query)
    .sort(sortExpression)
    .limit(params.first + 1) // Query one more element to see if there's another page.
    .lean({ getters: true });

  const response = prepareResponse<T>(results, params);
  return response;
}

// eslint-disable-next-line max-statements
function prepareResponse<T>(results: any, params: IPaginateOptions): IPaginateConnector<T> {
  const hasMore = results.length > params.first;

  // Remove the extra element that we added to 'peek' to see if there were more entries.
  if (hasMore) results.pop();

  const hasPreviousPage = !!params.after || !!(params.before && hasMore);
  const hasNextPage = !!params.before || hasMore;

  // If we sorted reverse to get the previous page, correct the sort order.
  if (params.before) results = results.reverse();

  // handle custom processing (mapping, filtering) before we create our graphql connector
  if (params.transformResponse) {
    results = params.transformResponse(results);
  }

  // map to edges
  const edges = results.map((item) => ({
    cursor: formatCursor(item, params.paginatedField),
    node: item,
  }));

  return {
    query: params.query,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor: edges[0] && edges[0].cursor,
      endCursor: edges[edges.length - 1] && edges[edges.length - 1].cursor,
    },
    edges,
  };
}

function formatCursor(doc: any, paginatedField: string): string {
  const shouldSecondarySortOnId = paginatedField !== '_id';
  const paginatedFieldValue = doc[paginatedField];
  if (shouldSecondarySortOnId) {
    // eslint-disable-next-line no-underscore-dangle
    return bsonUrlEncode([paginatedFieldValue, doc._id]);
  }
  return bsonUrlEncode(paginatedFieldValue);
}

function generateCursorQuery(params: IPaginateOptions): any {
  if (!params.after && !params.before) return {};

  const sortAsc = (!params.sortAscending && params.before) || (params.sortAscending && !params.before);
  const comparisonOp = sortAsc ? '$gt' : '$lt';
  const shouldSecondarySortOnId = params.paginatedField !== '_id';

  // a `after` cursor will have precedence over a `before` cursor.
  const op = params.after || params.before;

  if (shouldSecondarySortOnId) {
    return {
      $or: [
        {
          [params.paginatedField]: {
            [comparisonOp]: op[0],
          },
        },
        {
          [params.paginatedField]: {
            $eq: op[0],
          },
          _id: {
            [comparisonOp]: op[1],
          },
        },
      ],
    };
  }

  return {
    [params.paginatedField]: {
      [comparisonOp]: op,
    },
  };
}

function generateSort(params: IPaginateOptions): any {
  const sortAsc = (!params.sortAscending && params.before) || (params.sortAscending && !params.before);
  const sortDir = sortAsc ? 1 : -1;
  const shouldSecondarySortOnId = params.paginatedField !== '_id';

  if (shouldSecondarySortOnId) {
    return {
      [params.paginatedField]: sortDir,
      _id: sortDir,
    };
  }

  return {
    [params.paginatedField]: sortDir,
  };
}

function sanitizeParams(params: IPaginateOptions): IPaginateOptions {
  // add defaults
  params = {
    first: DEFAULT_FIRST,
    paginatedField: '_id',
    sortAscending: true,
    query: {},
    ...params,
  };

  // guard first
  if (params.first < 1) params.first = 1;
  if (params.first > MAX_FIRST) params.first = MAX_FIRST;

  // decode cursors
  if (params.after) params.after = bsonUrlDecode(params.after);
  if (params.before) params.before = bsonUrlDecode(params.before);

  return params;
}

function bsonUrlEncode(obj: any): string {
  return base64url.encode(ejson.stringify(obj));
}

function bsonUrlDecode(str: string): any {
  return ejson.parse(base64url.decode(str));
}
