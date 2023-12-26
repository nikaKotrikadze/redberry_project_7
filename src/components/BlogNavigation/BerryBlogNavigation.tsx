import React, { useEffect } from "react";
import "./berryblognavigation.css";
import { useCategoryStore } from "./blogCategory.store";
import { CategoryInterface } from "../../types/BerryBlogTypes";

const BerryBlogNavigation = () => {
  const {
    categories,
    setCategories,
    selectedCategories,
    toggleCategorySelection,
  } = useCategoryStore();

  useEffect(() => {
    setCategories();
  }, [setCategories]);

  return (
    <div className="blog-navigation">
      <div className="blog-navigation-container">
        {categories.map((item: CategoryInterface) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default BerryBlogNavigation;
