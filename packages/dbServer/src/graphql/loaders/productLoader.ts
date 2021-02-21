import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import { toGlobalId } from '../../globalId';
import { ProductModel, IProduct } from '../../models';

export const productMapper = (source: IProduct) => {
  if (!source) return null;
  return {
    ...source,
    id: toGlobalId('product', source.productID),
    category: {
      id: source.categoryID,
    },
  };
};

export const productLoader = new DataLoader<string, IProduct>(async (ids) => {
  // load comments
  const query: unknown = {
    productID: { $in: ids.map((id) => +id) },
  };
  const entities = await ProductModel.find(query).lean<IProduct>({ getters: true });
  const mappedEntities = entities.map((item) => productMapper(item));

  // make sure we return items in the right order
  const itemsById = keyBy(mappedEntities, 'productID');
  return ids.map((id) => itemsById[id]);
});
