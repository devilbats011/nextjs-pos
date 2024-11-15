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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  ordersCrumbs: string,
  setOrdersCrumbs: (ordersCrumbs: string) => void;
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
    //* Note: isLoading and setIsLoading uses in LoadingOverlay page ... LoadingOverlay page have z-index 50
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set((state: any) => ({ isLoading })),
    ordersCrumbs: '/user/orders',    
    setOrdersCrumbs: (ordersCrumbs: string) => set((state: any) => ({ ordersCrumbs })),

  })
);
