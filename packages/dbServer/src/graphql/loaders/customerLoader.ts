import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import { toGlobalId } from '../../globalId';
import { CustomerModel, ICustomer } from '../../models';

export const customerMapper = (customer: ICustomer) => {
  if (!customer) return null;
  return {
    ...customer,
    id: toGlobalId('customer', customer.customerID),
  };
};

export const customerLoader = new DataLoader<string, ICustomer>(async (ids) => {
  // load comments
  const query: unknown = {
    customerID: { $in: ids },
  };
  const items = await CustomerModel.find(query).lean<ICustomer>({ getters: true });
  const mappedItems = items.map((item) => customerMapper(item));

  // make sure we return items in the right order
  const itemsById = keyBy(mappedItems, 'customerID');
  return ids.map((id) => itemsById[id]);
});
