import API_URL from "./constant";
import { ItemProps } from "./interface/item";

interface itemsUseStoreProps {
  items: ItemProps[];
  getItems: () => Promise<any>;
  fetchItems: () => Promise<void>;
  addItem: (item: ItemProps) => Promise<void>;
  editItem: (
    id: number | string,
    updatedItem: Partial<ItemProps>
  ) => Promise<void>;
  deleteItem: (id: number | string) => Promise<void>;
}

export default function itemsUseStore(
  set: (fn: (state: any) => any) => void,
  get: any
): itemsUseStoreProps {
  const baseUrl = API_URL + "/items";

  const useStore = {
    items: [],
    getItems: async () => {
      try {
        const response = await fetch(baseUrl);
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
        const response = await fetch(baseUrl);
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
        const response = await fetch(baseUrl, {
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
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    },

    // Update existing item (Update)
    editItem: async (id: number | string, updatedItem: Partial<ItemProps>) => {
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
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
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    },

    // Delete an item (Delete)
    deleteItem: async (id: number | string) => {
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          set((state: any) => ({
            items: state.items.filter((item: ItemProps) => item.id !== id),
          }));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
  };
  return useStore;
}
