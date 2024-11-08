/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CategoryProps {
  id?: any;
  name?: string;
  created_at?: any;
  updated_at?: any;
  status?: any;

}

export interface categoryUseStoreInterface {
  category: CategoryProps[];
  getCategory: () => Promise<any>;
  addCategory: (item: CategoryProps) => Promise<boolean>;
  getCategoryById: (id: string) => Promise<CategoryProps | null>;
  // fetchItems: () => Promise<void>;
  editCategoryById: (
    id: string,
    updatedCategory: Partial<CategoryProps>
  ) => Promise<any>;
  deleteCategoryById: (id: string) => Promise<boolean>;
}
