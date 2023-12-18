import { create } from "zustand";
import { $api } from "../../utils/http";

export const useBlogsStore = create((set) => ({
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
