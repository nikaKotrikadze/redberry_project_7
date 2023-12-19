import React, { useEffect } from "react";
import "./berryblogadderinputs.css";
import BerryImageDragAndDrop from "./BerryImageDragAndDrop";
import Select from "react-select";
import { useCategoryStore } from "../../BlogNavigation/blogCategory.store";

const BerryBlogAdderInputs = () => {
  const { categories }: any = useCategoryStore();
  const options: any = [];
  const colourStyles: any = {
    control: (styles: any) => ({
      ...styles,
      border: "1px solid #e4e3eb",
      borderRadius: "12px",
      backgroundColor: "#fcfcfd",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
    }),
  };

  useEffect(() => {
    categories.forEach((i: any) => {
      options.push({ value: i.title, label: i.title });
    });
  }, []);

  const Selector = () => (
    <Select
      defaultValue={[]}
      isMulti
      name="categories"
      options={options}
      styles={colourStyles}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );

  return (
    <div className="blog-adder-container">
      <div className="blog-adder-info-box">
        <h1 className="blog-adder-title">ბლოგის დამატება</h1>
        {/* inputs */}
        <div className="blog-adder-inputs">
          {/* image drag and drop div */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                color: "#1A1A1F",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              ატვირთეთ ფოტო
            </label>
            <BerryImageDragAndDrop />
          </div>
          {/* author and title fields */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* author */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "280px",
              }}
            >
              <label className="blog-adder-inputs-label">ავტორი *</label>
              <input
                placeholder="შეიყვანეთ ავტორი"
                className="blog-adder-inputs-input"
              />
              <div>
                <li className="blog-inputs-bullet-points">მინიმუმ 4 სიმბოლო</li>
                <li className="blog-inputs-bullet-points">მინიმუმ 2 სიტყვა</li>
                <li className="blog-inputs-bullet-points">
                  მხოლოდ ქართული სიმბოლოები
                </li>
              </div>
            </div>
            {/* title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "280px",
              }}
            >
              <label className="blog-adder-inputs-label">სათაური *</label>
              <input
                placeholder="შეიყვანეთ სათაური"
                className="blog-adder-inputs-input"
              />
              <div>
                <h3 className="blog-inputs-bullet-points">მინიმუმ 2 სიმბოლო</h3>
              </div>
            </div>
          </div>
          {/* description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label className="blog-adder-inputs-label">აღწერა *</label>
            <textarea
              placeholder="შეიყვანეთ აღწერა"
              className="blog-adder-textarea"
            ></textarea>
            <h3 className="blog-inputs-bullet-points">მინიმუმ 2 სიმბოლო</h3>
          </div>
          {/* date and category */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "280px",
              }}
            >
              <label className="blog-adder-inputs-label">
                გამოქვეყნების თარიღი *
              </label>
              <input type="date" className="blog-adder-inputs-input" />
            </div>
            {/* category selector */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "280px",
              }}
            >
              <label className="blog-adder-inputs-label">კატეგორია</label>
              <Selector />
            </div>
          </div>
        </div>
        {/* button */}
        {/* <button></button> */}
      </div>
    </div>
  );
};

export default BerryBlogAdderInputs;
