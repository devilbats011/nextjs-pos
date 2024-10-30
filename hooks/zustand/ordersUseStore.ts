import API_URL from "./constant";
import { CategoryProps } from "./interface/category";
import { OrderProp } from "./interface/order";

export default function ordersUseStore(
  set: (fn: (state: any) => any) => void,
  get: any
): any {
  const baseUrl = API_URL + "/orders";

  const useStore = {
    orders: [],
    getOrders: async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching items:", error);
        return [];
      }
    },
    fetchOrder: async (orderId?: string) : Promise<OrderProp|undefined> => {
      try {
        if (!orderId) {
          throw new Error("No order ID provided");
        }
        const response = await fetch(`${baseUrl}/${orderId}`);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error fetching order: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Order Data:", data);
        return data; // Return the fetched data for further use
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  };

  return useStore;
}
