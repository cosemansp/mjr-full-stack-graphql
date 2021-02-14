import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import { toGlobalId } from '../../globalId';
import { CategoryModel, ICategory } from '../../models';

export const categoryMapper = (category: ICategory) => {
  if (!category) return null;
  return {
    ...category,
    id: toGlobalId('category', category.categoryID),
  };
};

export const categoryLoader = new DataLoader<number, ICategory>(async (ids) => {
  // load comments
  const query: unknown = {
    categoryID: { $in: ids },
  };
  const categories = await CategoryModel.find(query).lean<ICategory>({ getters: true });
  const mapperCategories = categories.map((item) => categoryMapper(item));

  // make sure we return items in the right order
  const itemsById = keyBy(mapperCategories, 'categoryID');
  return ids.map((id) => itemsById[id]);
});
