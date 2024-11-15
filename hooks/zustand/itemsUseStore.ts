/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import API_URL from "../helper/constant";
import {
  convertToFormData,
  fetchWithAuth,
  fetchWithOnlyAuthHeader,
} from "../helper/helper";
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
    addItem: async (
      newItem: ItemProps,
      representation_mod: "color" | "image" = "color"
    ) => {
      try {
        let body = null;
        let response;
        if (representation_mod == "color") {
          body = JSON.stringify(newItem);
          response = await fetchWithAuth(baseUrl, {
            method: "POST",
            body,
          });
        } else {
          body = convertToFormData(newItem);
          response = await fetchWithOnlyAuthHeader(baseUrl, {
            method: "POST",
            body,
          });
        }

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
    editItem: async (
      id: number | string,
      updatedItem: Partial<ItemProps>,
      representation_mod: "color" | "image"
    ) => {
      try {
        let body = null;
        let response;
        if (representation_mod == "color") {
          body = JSON.stringify(updatedItem);
          response = await fetchWithAuth(`${baseUrl}/${id}`, {
            method: "POST",
            body,
          });
        } else {
          body = convertToFormData(updatedItem);
          // console.log(body.get('representation_image'));
          // return;
          response = await fetchWithOnlyAuthHeader(`${baseUrl}/${id}`, {
            method: "POST",
            body,
          });
        }

        // response = await fetchWithAuth(`${baseUrl}/${id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(updatedItem),
        // });

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
