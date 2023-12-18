import React, { useEffect } from "react";
import "./berryblogs.css";
import BlogTemplate from "./BlogTemplate";
import { useBlogsStore } from "./blogs.store";
import { useCategoryStore } from "../BlogNavigation/blogCategory.store";
const BerryBlogs = () => {
  const { blogs, setBlogs }: any = useBlogsStore();
  const { selectedCategories }: any = useCategoryStore();

  useEffect(() => {
    setBlogs();
  }, []);

  const filteredBlogs = selectedCategories.length
    ? blogs.filter((blog: any) => {
        const blogCategories = blog.categories.map(
          (category: any) => category.id
        );
        return selectedCategories.some((selectedCategory: number) =>
          blogCategories.includes(selectedCategory)
        );
      })
    : blogs;

  return (
    <div className="blogs-container">
      {filteredBlogs.map((item: any) => (
        <BlogTemplate
          key={item.id}
          id={item.id}
          image={item.image}
          author={item.author}
          categories={item.categories}
          description={item.description}
          publish_date={item.publish_date}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default BerryBlogs;
