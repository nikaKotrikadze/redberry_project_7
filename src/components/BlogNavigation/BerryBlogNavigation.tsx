import React, { useEffect, useState } from "react";
import "./berryblognavigation.css";
import { useCategoryStore } from "./blogCategory.store";
import { log } from "console";

const BerryBlogNavigation = () => {
  const {
    categories,
    setCategories,
    selectedCategories,
    toggleCategorySelection,
  }: any = useCategoryStore();

  useEffect(() => {
    setCategories();
  }, []);
  console.log("categories", categories);

  return (
    <div className="blog-navigation-container">
      {categories.map((item: any) => (
        <button
          key={item.id}
          onClick={() => toggleCategorySelection(item.id)}
          style={{
            background: item.background_color,
            border: selectedCategories.includes(item.id)
              ? "1px solid black"
              : "none",
            padding: "8px 16px 8px 16px",
            borderRadius: "30px",
            cursor: "pointer",
          }}
        >
          <h5
            style={{
              color: item.text_color,
              fontSize: "12px",
              lineHeight: "16px",
              fontWeight: "500",
            }}
          >
            {item.title}
          </h5>
        </button>
      ))}
    </div>
  );
};

export default BerryBlogNavigation;
