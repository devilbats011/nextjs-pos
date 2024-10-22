import { create } from "zustand";
import { persist } from "zustand/middleware";

export default create((set: any) => ({
  items: [
    {
      id: 1,
      name: "11name",
      quantity: 10,
      price: 10,
    },
    {
      id: 2,
      name: "22name",
      quantity: 10,
      price: 22,
    },
  ],
  orderItems: [],
  setOrderItems: (item: any) =>
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
  getTotalOrderItemsPrice: () => {
    const orderItems = sessionStorage.getItem("orderItems");
    let total = 0
    if (orderItems) {
       total = JSON.parse(orderItems).reduce(
        (total: any, item: any) => total + item.price,
        0
      );
      //decimal 2 point
      total = !total ? 0 : total;
      return total.toFixed(2);
    }
    return total.toFixed(2);
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
  bears: 0,
  updateBears: (newBears: any) => set({ bears: newBears }),
}));
