import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import { parse } from 'date-fns';
import { toGlobalId } from '../../globalId';
import { OrderModel, IOrder } from '../../models';

const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss.SSS';

export const orderMapper = (order: IOrder) => {
  if (!order) return null;
  const orderDate = parse(order.orderDate, DATE_FORMAT, new Date());
  const requiredDate = parse(order.requiredDate, DATE_FORMAT, new Date());
  const shippedDate = parse(order.shippedDate, DATE_FORMAT, new Date());
  return {
    ...order,
    orderDate,
    requiredDate,
    shippedDate,
    details: order.details.map((item) => {
      return {
        ...item,
        product: {
          id: toGlobalId('product', item.productID),
        },
      };
    }),
    customer: {
      id: toGlobalId('customer', order.customerID),
    },
    id: toGlobalId('order', order.orderID),
  };
};

export const orderLoader = new DataLoader<string, IOrder>(async (ids) => {
  // load comments
  const query: unknown = {
    orderID: { $in: ids.map((id) => +id) },
  };
  const items = await OrderModel.find(query).lean<IOrder>({ getters: true });
  const mappedItems = items.map((item) => orderMapper(item));

  // make sure we return items in the right order
  const itemsById = keyBy(mappedItems, 'orderID');
  return ids.map((id) => itemsById[id]);
});
