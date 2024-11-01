import API_URL from "../helper/constant";
import { CategoryProps, categoryUseStoreInterface } from "./interface/category";


export default function categoryUseStore(
  set: (fn: (state: any) => any) => void,
  get: any
): categoryUseStoreInterface {
  const baseUrl = API_URL + "/category";

  const useStore = {
    category: [],
    getCategory: async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching items:", error);
        return [];
      }
    },
    addCategory: async (newCategory: CategoryProps) => {
      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });

        if (response.ok) {
          const data = await response.json();
          set((state: any) => ({
             category: [...state.category, data],
          }));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding item:", error);
        return false;
      }
    },

  };

  return useStore;
}
