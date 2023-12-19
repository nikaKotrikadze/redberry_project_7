import React, { useEffect, useState } from "react";
import "./berryblogadderinputs.css";
import BerryImageDragAndDrop from "./BerryImageDragAndDrop";
import Select from "react-select";
import { useCategoryStore } from "../../BlogNavigation/blogCategory.store";
import { $api } from "../../../utils/http";
import { ReactSVG } from "react-svg";
import emailErrorIcon from "../../../images/emailErrorIcon.svg";
const BerryBlogAdderInputs = () => {
  const { categories, setCategories }: any = useCategoryStore();
  const [options, setOptions] = useState([]);
  const [form, setForm] = useState(() => {
    const storedForm = JSON.parse(localStorage.getItem("blogForm") || "{}");
    return {
      author: "",
      title: "",
      description: "",
      date: "",
      category: [],
      email: "",
      isFormValid: false,
      ...storedForm,
    };
  });

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;
    let isFormValid = true;

    switch (name) {
      case "author":
        isFormValid =
          value.length >= 4 &&
          value.split(" ").length >= 2 &&
          isGeorgianSymbol(value.trim());
        break;
      case "title":
        isFormValid = value.trim().length >= 2;
        break;
      case "description":
        isFormValid = value.trim().length >= 2;
        break;
      case "date":
        isFormValid = value !== "";
        break;
      case "category":
        console.log("Selected category:", value);
        isFormValid = value.length > 0;
        break;
      case "email":
        isFormValid = value.endsWith("@redberry.ge");
        break;
      default:
        break;
    }

    const newForm = {
      ...form,
      [name]: name === "category" ? (value ? [value] : []) : value,
    };

    for (const key in newForm) {
      if (newForm.hasOwnProperty(key) && key !== "isFormValid") {
        const fieldValue = newForm[key];
        if (
          (Array.isArray(fieldValue) && fieldValue.length === 0) ||
          (!fieldValue && key !== "category")
        ) {
          isFormValid = false;
          break;
        }
      }
    }

    console.log("Form values:", newForm);
    console.log("Is form valid?", isFormValid);

    setForm({
      ...newForm,
      isFormValid,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $api.get("/categories");
        const newCategories = response.data.data;
        setCategories(newCategories);

        const categoryOptions = newCategories.map((i: any) => ({
          value: i.title,
          label: i.title,
          text_color: i.text_color,
          background_color: i.background_color,
        }));

        setOptions(categoryOptions);
      } catch (error) {
        console.error("Fetch error in categories:", error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  useEffect(() => {
    localStorage.setItem("blogForm", JSON.stringify(form));
  }, [form]);

  const colourStyles: any = {
    control: (styles: any) => ({
      ...styles,
      border: `1px solid ${form.category.length >= 1 ? "#14D81C" : "#EA1919"}`,
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

  const Selector = () => (
    <Select
      value={form.category}
      onChange={(selectedOptions: any) => {
        console.log(selectedOptions);
        setForm((prevForm: any) => ({
          ...prevForm,
          category: selectedOptions,
        }));
      }}
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

  const isGeorgianSymbol = (input: string): boolean => {
    const georgianRegex = /^[\u10A0-\u10FF]+$/;
    const isOnlyGeorgianLetters = georgianRegex.test(input.replace(/\s/g, ""));
    const containsSymbolsOrNumbers =
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(input);
    return isOnlyGeorgianLetters && !containsSymbolsOrNumbers;
  };

  const handleBlogSubmitter = () => {
    console.log("blog submitted");
  };
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
                name="author"
                value={form.author}
                onChange={handleFormChange}
                placeholder="შეიყვანეთ ავტორი"
                className="blog-adder-inputs-input"
                style={{
                  border: `1px solid ${
                    form.author.length >= 4 ? "#14D81C" : "#EA1919"
                  }`,
                  borderRadius: "12px",
                }}
              />
              <div>
                <li
                  className="blog-inputs-bullet-points"
                  style={{
                    color: form.author.length >= 4 ? "#14D81C" : "#EA1919",
                  }}
                >
                  მინიმუმ 4 სიმბოლო
                </li>

                <li
                  className="blog-inputs-bullet-points"
                  style={{
                    color:
                      form.author.split(" ").length >= 2
                        ? "#14D81C"
                        : "#EA1919",
                  }}
                >
                  მინიმუმ 2 სიტყვა
                </li>
                <li
                  className="blog-inputs-bullet-points"
                  style={{
                    color: isGeorgianSymbol(form.author)
                      ? "#14D81C"
                      : "#EA1919",
                  }}
                >
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
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="შეიყვანეთ სათაური"
                className="blog-adder-inputs-input"
                style={{
                  border: `1px solid ${
                    form.title.length >= 2 ? "#14D81C" : "#EA1919"
                  }`,
                  borderRadius: "12px",
                }}
              />
              <div>
                <h3
                  className="blog-inputs-bullet-points"
                  style={{
                    color: form.title.length >= 2 ? "#14D81C" : "#EA1919",
                  }}
                >
                  მინიმუმ 2 სიმბოლო
                </h3>
              </div>
            </div>
          </div>
          {/* description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label className="blog-adder-inputs-label">აღწერა *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="შეიყვანეთ აღწერა"
              className="blog-adder-textarea"
              style={{
                border: `1px solid ${
                  form.description.length >= 2 ? "#14D81C" : "#EA1919"
                }`,
                borderRadius: "12px",
              }}
            ></textarea>
            <h3
              className="blog-inputs-bullet-points"
              style={{
                color: form.description.length >= 2 ? "#14D81C" : "#EA1919",
              }}
            >
              მინიმუმ 2 სიმბოლო
            </h3>
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
              <input
                name="date"
                value={form.date}
                onChange={handleFormChange}
                type="date"
                className="blog-adder-inputs-input"
                style={{
                  border: `1px solid ${form.date ? "#14D81C" : "#EA1919"}`,
                  borderRadius: "12px",
                }}
              />
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
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="Example@redberry.ge"
              className="blog-adder-inputs-input"
              style={{
                border: `1px solid ${
                  form.email.endsWith("@redberry.ge") ? "#14D81C" : "#EA1919"
                }`,
                background: !form.email.endsWith("@redberry.ge")
                  ? "#FAF2F3"
                  : "",
              }}
            />
            {!form.email.endsWith("@redberry.ge") && (
              <div style={{ display: "flex", gap: "8px" }}>
                <ReactSVG src={emailErrorIcon} />
                <h1
                  style={{
                    color: "#EA1919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "20px",
                  }}
                >
                  მეილი უნდა მთავრდებოდეს @redberry.ge-ით
                </h1>
              </div>
            )}
          </div>
        </div>
        {/* button */}
        <button
          disabled={!form.isFormValid}
          onClick={handleBlogSubmitter}
          style={{
            backgroundColor: !form.isFormValid ? "#E4E3EB" : "#5D37F3",
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
