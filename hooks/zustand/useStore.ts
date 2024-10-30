/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import itemsUseStore from "./itemsUseStore";
import categoryUseStore from "./categoryUseStore";
import ordersUseStore from "./ordersUseStore";

export default create((set: any, get: any) => ({
  ...itemsUseStore(set, get),
  ...categoryUseStore(set, get),
  ...ordersUseStore(set, get),
  sidebarIsOpen: false,
  setSidebarIsOpen: (isOpen: boolean) => set((state: any) => ({ sidebarIsOpen: isOpen })),
  toggleSidebar: ()=> {
    const setSidebarIsOpen = get().setSidebarIsOpen;
    setSidebarIsOpen(!get().sidebarIsOpen);
    console.log('cxxsxsx!');
  },
  orderItems: [],
  setOrderItems: (item: unknown) =>
    set((state: any) => {
      const orderItems = state.getOrderItems();
      orderItems.push(item);
      sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
      return { orderItems: orderItems };
    }),
  getOrderItems: () => {
    const orderItems = sessionStorage.getItem("orderItems");
    if (orderItems) {
      return JSON.parse(orderItems);
    }
    return [];
  },
  clearOrderItems: () => {
    set({ orderItems: [] });
    sessionStorage.removeItem("orderItems");
  },
  deleteOrderItem: (item: any) => {
    set((state: any) => {
      const orderItems = state.getOrderItems();
      orderItems.splice(
        orderItems.find((i: any) => i.id === item.id && i.name === item.name),
        1
      );
      sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
      return { orderItems: orderItems };
    });
  },
  groupedItemList: () => {
    const orderItems = get().getOrderItems();
    const newArray = orderItems.reduce((acc: any, item: any) => {
      const existingItem = acc.find((i: any) => i.id === item.id);
      if (existingItem) {
        // If item with same id exists, sum quantity and total price
        existingItem.quantity += item.quantity;
        existingItem.price += item.quantity * item.price;
      } else {
        // Otherwise, add the new item with calculated total price
        acc.push({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.quantity * item.price, // total price of the item
          itemPrice: item.price, // a single price of the item
        });
      }
      return acc;
    }, []);
    return newArray;
  },
  getTotalOrderItemsPrice: () => {
    const arr = get().getOrderItems();
    let total = 0;
    if (arr) {
      total = arr.reduce(
        (total: any, item: any) => total + item.price * item.quantity,
        0
      );
      //decimal 2 point
      total = !total ? 0 : total;
      return total.toFixed(2);
    }
    return total.toFixed(2);
  },
  bears: 0,
  updateBears: (newBears: unknown) => set({ bears: newBears }),
}));
