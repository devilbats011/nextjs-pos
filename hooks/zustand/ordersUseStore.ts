/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrlOrders as baseUrl } from "../helper/constant";
import { fetchWithAuth } from "../helper/helper";
import {
  OrdersStateInterface,
  OrderProp,
  ItemProps,
  BillProp,
} from "./interface/item";

export default function ordersUseStore(
  set: any,
  get: any
): OrdersStateInterface {
  const useStore = {
    orders: [],
    getOrders: async () => {
      try {
        const response = await fetchWithAuth(baseUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching items:", error);
        return [];
      }
    },
    getOrderById: async (id: string): Promise<OrderProp | undefined> => {
      try {
        if (!id) {
          throw new Error("No order ID provided");
        }
        const response = await fetchWithAuth(`${baseUrl}/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching order: ${response.statusText}`);
        }
        const data = await response.json();
        return data; // Return the fetched data for further use
      } catch (error) {
        console.error("Fetch error:", error);
        return undefined;
      }
    },
    //? orderItems not much use..see getOrderItems()
    orderItems: [],
    setOrderItems: (item: unknown) =>
      set((state: any) => {
        const orderItems = state.getOrderItems();
        orderItems.push(item);
        sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
        return { orderItems };
      }),
    getOrderItems: () => {
      const orderItems = sessionStorage.getItem("orderItems");
      if (orderItems) {
        // set((state: any) => {
        //   return { orderItems };
        // });
        return JSON.parse(orderItems);
      }
      return [];
    },
    deleteGroupOrderItemsById: (id: string): void => {
      const orderItems = sessionStorage.getItem("orderItems");
      if (!orderItems) {
        return;
      }
      set((state: any) => {
        const parsedOrderItems = JSON.parse(orderItems);
        const newOrderItems = parsedOrderItems.filter((item: any) => item.id !== id);
        sessionStorage.setItem("orderItems", JSON.stringify(newOrderItems));
        return { orderItems: newOrderItems };
      });
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
      try {
        const orderItems = get().getOrderItems();
        const newArray = orderItems.reduce((acc: any, item: any) => {
          const existingItem = acc.find((i: any) => i.id === item.id);
          if (existingItem) {
            // If item with same id exists, sum quantity and total price
            existingItem.quantity++; //item.quantity;
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
      } catch (error) {
        console.error("Error grouping items:", error);
        return [];
      }
    },
    incrementOrderItemQuantity: (itemId: string) =>
      set((state: any) => {
        // Safeguard against undefined/null orderItems by providing a default empty array
        const orderItems = [...state.getOrderItems()];

        orderItems.push(orderItems.find((item: any) => item.id === itemId));
        sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
        return { orderItems: orderItems };
      }),
    decrementOrderItemQuantity: (itemId: string): ItemProps[] => {
      let orderItems: ItemProps[] = [];
      set((state: any) => {
        // Safeguard against undefined/null orderItems by providing a default empty array
        orderItems = [...(state.getOrderItems() || [])];

        if (orderItems && orderItems.length === 1) {
          return { orderItems };
        }

        const index = orderItems.findIndex((item: any) => item.id === itemId);
        if (index !== -1) {
          const item = orderItems[index];

          // Check if item has a quantity property and it's greater than 1 before decrementing
          if (item.quantity && item.quantity > 1) {
            item.quantity -= 1; // Reduce quantity by 1
          } else {
            // Remove the item if quantity is 1 or undefined
            orderItems.splice(index, 1);
          }
        }

        sessionStorage.setItem("orderItems", JSON.stringify(orderItems));
        return { orderItems };
      });
      return orderItems;
    },
    getTotalOrderItemsPrice: () => {
      const arr = get().getOrderItems();
      let total = 0;
      if (arr) {
        total = arr.reduce(
          (total: any, item: any) =>
            total + parseFloat(item.price) * item.quantity,
          0
        );
        //decimal 2 point
        total = !total ? 0 : total;
        return total.toFixed(2);
      }
      return total.toFixed(2);
    },
    refundBill: (bill: BillProp, quantity: number) => {
      return fetchWithAuth(baseUrl + "/" + bill.id, {
        method: "PUT",
        body: JSON.stringify({
          quantity,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .catch((error) => {
          console.error("Error refunding bill:", error);
          return null;
        });
      // .finally(() => {
      //   console.log("Finnaly refundBill");
      // })
    },
  };

  return useStore;
}
