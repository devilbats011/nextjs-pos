/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrlCategory as baseUrl } from "../helper/constant";
import { fetchWithAuth } from "../helper/helper";
import { CategoryProps, categoryUseStoreInterface } from "./interface/category";

export default function categoryUseStore(
  set: (fn: (state: any) => any) => void,
  get: any
): categoryUseStoreInterface {
  const useStore = {
    category: [],
    getCategory: async () => {
      try {
        const response = await fetchWithAuth(baseUrl);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching items:", error);
        return [];
      }
    },
    getCategoryById: async (id: string) => {
      try {
        const response = await fetch(baseUrl + `/${id}`, {
          method: "POST",
        });
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
    editCategoryById: async (
      id: string,
      updatedCategory: Partial<CategoryProps>
    ) => {
      try {
        const response = await fetch(baseUrl + `/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        });
        if (response.ok) {
          const data = await response.json();
          set((state: any) => ({
            category: state.category.map((item: any) =>
              item.id === id ? data : item
            ),
          }));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding item:", error);
        return false;
      }
    },
    addCategory: async (newCategory: CategoryProps) => {
      try {
        const response = await fetchWithAuth(baseUrl, {
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
    deleteCategoryById: async (id: string) => {
      try {
        const response = await fetch(baseUrl + `/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          set((state: any) => ({
            category: state.category.filter((item: any) => item.id !== id),
          }));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting item:", error);
        return false;
      }
    },
  };

  return useStore;
}
