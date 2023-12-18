import { create } from "zustand";
import { $api } from "../../utils/http";

export const useCategoryStore = create((set) => ({
  categories: [],
  setCategories: async () => {
    try {
      const response = await $api.get("/categories");
      const newCategories = response.data.data;
      set({ categories: newCategories });
    } catch (error) {
      console.error("Fetch error in categories:", error);
    }
  },
}));
