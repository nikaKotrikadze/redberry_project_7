import React, { useEffect } from "react";
import "./berryblogs.css";
import BlogTemplate from "./BlogTemplate";
import { useBlogsStore } from "./blogs.store";
const BerryBlogs = () => {
  const { blogs, setBlogs }: any = useBlogsStore();
  useEffect(() => {
    setBlogs();
  }, []);

  return (
    <div className="blogs-container">
      {blogs.map((item: any) => (
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
