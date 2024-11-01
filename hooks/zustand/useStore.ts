/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import itemsUseStore from "./itemsUseStore";
import categoryUseStore from "./categoryUseStore";
import ordersUseStore from "./ordersUseStore";
import { itemsUseStoreProps } from "./interface/item";
import { categoryUseStoreInterface } from "./interface/category";
import { OrdersStateInterface } from "./interface/item";

export interface useStoreProps
  extends itemsUseStoreProps,
    categoryUseStoreInterface,
    OrdersStateInterface {

  toggleSidebar: any;
  sidebarIsOpen: boolean;
 
  setSidebarIsOpen: any;

  // editCategory: (
  //   id: number | string,
  //   updatedItem: Partial<CategoryProps>
  // ) => Promise<void>;
  // deleteCategory: (id: number | string) => Promise<void>;
}

export default create(
  (set: any, get: any): useStoreProps => ({
    ...itemsUseStore(set, get),
    ...categoryUseStore(set, get),
    ...ordersUseStore(set, get),
    sidebarIsOpen: false,
    setSidebarIsOpen: (isOpen: boolean) =>
      set((state: any) => ({ sidebarIsOpen: isOpen })),
    toggleSidebar: () => {
      const setSidebarIsOpen = get().setSidebarIsOpen;
      setSidebarIsOpen(!get().sidebarIsOpen);
    },
  })
);
