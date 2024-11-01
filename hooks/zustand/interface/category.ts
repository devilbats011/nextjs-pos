export interface CategoryProps {
  id?: any;
  name?: any;
}

export interface categoryUseStoreInterface {
  category: CategoryProps[];
  getCategory: () => Promise<any>;
  addCategory: (item: CategoryProps) => Promise<Boolean>;
  // fetchItems: () => Promise<void>;
  // editItem: (
  //   id: number | string,
  //   updatedItem: Partial<ItemProps>
  // ) => Promise<void>;
  // deleteItem: (id: number | string) => Promise<void>;
}
