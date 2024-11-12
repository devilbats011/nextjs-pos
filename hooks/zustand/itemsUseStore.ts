/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import API_URL from "../helper/constant";
import { fetchWithAuth } from "../helper/helper";
import { ItemProps, itemsUseStoreProps } from "./interface/item";

export default function itemsUseStore(
  set: (fn: (state: any) => any) => void,
  get: any
): itemsUseStoreProps {
  const baseUrl = API_URL + "/items";
  const useStore = {
    items: [],
    getItems: async () => {
      try {
        const response = await fetchWithAuth(baseUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching items:", error);
        // return get().items;
        return [];
      }
    },
    fetchItems: async () => {
      try {
        const response = await fetchWithAuth(baseUrl);
        const data = await response.json();
        set((state: any) => {
          return { items: data };
        });
      } catch (error) {
        set((state: any) => {
          return { items: [] };
        });
        console.error("Error fetching items:", error);
      }
    },
    // Add new item (Create)
    addItem: async (newItem: ItemProps) => {
      try {
        const response = await fetchWithAuth(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          const addedItem = await response.json();
          set((state: any) => ({
            items: [...state.items, addedItem],
          }));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding item:", error);
        return false;
      }
    },

    // Update existing item (Update)
    editItem: async (id: number | string, updatedItem: Partial<ItemProps>) => {
      try {
        const response = await fetchWithAuth(`${baseUrl}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        });

        if (response.ok) {
          const updated = await response.json();
          set((state: any) => ({
            items: state.items.map((item: ItemProps) =>
              item.id === id ? { ...item, ...updated } : item
            ),
          }));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating item:", error);
        return false;
      }
    },

    // Delete an item (Delete)
    deleteItemById: async (id: number | string) => {
      try {
        const response = await fetchWithAuth(`${baseUrl}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          set((state: any) => ({
            items: state.items.filter((item: ItemProps) => item.id !== id),
          }));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting item:", error);
        return false;
      }
    },
    getItemById: async (id: string) => {
      try {
        const response = await fetchWithAuth(baseUrl + `/${id}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        }
        return null;
      } catch (error) {
        console.error("Error fetching items:", error);
        return null;
      }
    },
  };
  return useStore;
}
