import { create } from "zustand";
import { $api } from "../../utils/http";
import { BlogTemplateInterface } from "../../types/BerryBlogTypes";

interface BlogsStoreInterface {
  blogs: BlogTemplateInterface[];
  setBlogs: () => void;
}

export const useBlogsStore = create<BlogsStoreInterface>((set) => ({
  blogs: [],
  setBlogs: async () => {
    try {
      const response = await $api.get("/blogs");
      const newBlogs = response.data.data;
      set({ blogs: newBlogs });
    } catch (error) {
      console.error("Fetch error in Blogs", error);
    }
  },
}));

interface CarouselStoreInterface {
  hasCurrentPageReseted: boolean;
  setHasCurrentPageReseted: () => void;
  resetCurrentPage: () => void;
}

export const useCarouselStore = create<CarouselStoreInterface>((set) => ({
  hasCurrentPageReseted: false,
  setHasCurrentPageReseted: () => set({ hasCurrentPageReseted: true }),
  resetCurrentPage: () => set({ hasCurrentPageReseted: false }),
}));
