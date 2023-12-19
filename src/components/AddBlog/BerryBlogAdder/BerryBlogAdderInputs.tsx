import React, { useEffect, useState } from "react";
import "./berryblogadderinputs.css";
import BerryImageDragAndDrop from "./BerryImageDragAndDrop";
import Select from "react-select";
import { useCategoryStore } from "../../BlogNavigation/blogCategory.store";

const BerryBlogAdderInputs = () => {
  const { categories }: any = useCategoryStore();
  const [options, setOptions] = useState([]);

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
    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        color: "white",
        backgroundColor: data.background_color,
        borderRadius: "12px",
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: "white",
      ":hover": {
        cursor: "pointer",
      },
    }),
  };

  useEffect(() => {
    const categoryOptions = categories.map((i: any) => ({
      value: i.title,
      label: i.title,
      text_color: i.text_color,
      background_color: i.background_color,
    }));
    setOptions(categoryOptions);
  }, [categories]);

  const Selector = () => (
    <Select
      defaultValue={[]}
      closeMenuOnSelect={false}
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
          {/* email */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "280px",
            }}
          >
            <label className="blog-adder-inputs-label">ელ-ფოსტა</label>
            <input
              placeholder="Example@redberry.ge"
              className="blog-adder-inputs-input"
            />
          </div>
        </div>
        {/* button */}
        <button
          style={{
            backgroundColor: "#5D37F3",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FFFFFF",
            width: "288px",
            alignSelf: "flex-end",
          }}
        >
          გამოქვეყნება
        </button>
      </div>
    </div>
  );
};

export default BerryBlogAdderInputs;
