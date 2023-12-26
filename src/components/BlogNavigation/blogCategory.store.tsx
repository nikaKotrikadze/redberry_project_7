import { create } from "zustand";
import { $api } from "../../utils/http";
import { CategoryInterface } from "../../types/BerryBlogTypes";

interface CategoryStoreInterface {
  categories: CategoryInterface[];
  selectedCategories: number[];
  setCategories: () => void;
  toggleCategorySelection: (id: number | null) => void;
}

export const useCategoryStore = create<CategoryStoreInterface>((set) => {
  const savedSelectedCategories = JSON.parse(
    localStorage.getItem("selectedCategories") || "[]"
  );

  return {
    categories: [],
    selectedCategories: savedSelectedCategories,
    setCategories: async () => {
      try {
        const response = await $api.get("/categories");
        const newCategories = response.data.data;
        set({ categories: newCategories });
      } catch (error) {
        console.error("Fetch error in categories:", error);
      }
    },
    toggleCategorySelection: (id: number | null) => {
      set((state: any) => {
        const updatedSelectedCategories = state.selectedCategories.includes(id)
          ? state.selectedCategories.filter(
              (categoryId: number) => categoryId !== id
            )
          : [...state.selectedCategories, id];

        localStorage.setItem(
          "selectedCategories",
          JSON.stringify(updatedSelectedCategories)
        );

        return { selectedCategories: updatedSelectedCategories };
      });
    },
  };
});
