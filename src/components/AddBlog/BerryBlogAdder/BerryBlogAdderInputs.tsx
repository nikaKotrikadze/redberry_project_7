import React, { useEffect, useState } from "react";
import "./berryblogadderinputs.css";
import BerryImageDragAndDrop from "./BerryImageDragAndDrop";
import Select from "react-select";
import { useCategoryStore } from "../../BlogNavigation/blogCategory.store";
import { $api } from "../../../utils/http";
import { ReactSVG } from "react-svg";
import emailErrorIcon from "../../../images/emailErrorIcon.svg";
import calendarIcon from "../../../images/calendarIcon.svg";
import {
  useBlogAddedSuccessfullyModalStore,
  useFileStore,
} from "./blogadder.store";
import BerryBlogAdderSuccessModal from "./BerryBlogAdderSuccessModal";
import {
  CategoryInterface,
  SelectedCategoryInterface,
} from "../../../types/BerryBlogTypes";

const BerryBlogAdderInputs = () => {
  const { categories, setCategories }: any = useCategoryStore();
  const { base64String, setUploadedFile }: any = useFileStore();
  const [options, setOptions] = useState([]);
  const { openModal }: any = useBlogAddedSuccessfullyModalStore();

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
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleFormChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "categories") {
      const categoryIds = value.map((category: CategoryInterface) => {
        return category.id;
      });
      setForm((prevForm: any) => ({
        ...prevForm,
        category: categoryIds,
      }));
    }
  };

  const base64ToBlob = (base64String: string) => {
    const byteString = atob(base64String);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: "image/jpeg" });
  };

  const handleBlogSubmitter = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("author", form.author);
    formData.append("publish_date", form.date);
    formData.append("categories", JSON.stringify(form.category));
    formData.append("email", form.email);
    formData.append("image", base64ToBlob(base64String), "image.jpg");

    try {
      const response = await $api.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Blog posted successfully:", response);
      openModal();
      resetForm();
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  const resetForm = () => {
    setForm({
      author: "",
      title: "",
      description: "",
      date: "",
      category: [],
      email: "",
      isFormValid: false,
    });
    localStorage.removeItem("uploadedFileName");
    localStorage.removeItem("base64String");
    setUploadedFile(null, null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $api.get("/categories");
        const newCategories = response.data.data;

        setCategories(newCategories);
        const categoryOptions = newCategories.map((i: CategoryInterface) => {
          return {
            id: i.id,
            value: i.title,
            label: i.title,
            text_color: i.text_color,
            background_color: i.background_color,
          };
        });

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
      border: `1px solid ${
        form.category.length >= 1
          ? "#14D81C"
          : form.category.length === 0
          ? "#E4E3EB"
          : "#EA1919"
      }`,
      borderRadius: "12px",
      backgroundColor: "#fcfcfd",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
    }),
    // menu: (styles: any) => ({
    //   ...styles,
    // }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        background: data.background_color,
        color: data.text_color,
        padding: "8px 16px",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
        cursor: "pointer",
      };
    },

    multiValue: (styles: any, { data }: any) => {
      return {
        ...styles,
        color: data.text_color,
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
      value={options.filter((option: CategoryInterface) => {
        return form.category.includes(option.id);
      })}
      onChange={(selectedOptions: any) => {
        setForm((prevForm: any) => ({
          ...prevForm,
          category: selectedOptions.map(
            (option: CategoryInterface) => option.id
          ),
        }));
      }}
      defaultValue={[]}
      closeMenuOnSelect={false}
      isClearable={false}
      isMulti
      name="categories"
      options={options}
      getOptionLabel={(option: SelectedCategoryInterface) => option.label}
      getOptionValue={(option: any) => option.id}
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

  return (
    <form
      // method="POST"
      onSubmit={handleBlogSubmitter}
      className="blog-adder-container"
      encType="multipart/form-data"
    >
      <div className="blog-adder-info-box">
        <BerryBlogAdderSuccessModal />
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
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="შეიყვანეთ ავტორი"
                className="blog-adder-inputs-input"
                style={{
                  border: `1px solid ${
                    isInputFocused
                      ? "#5D37F3" // Border color when focused
                      : form.author.length >= 4
                      ? "#14D81C"
                      : form.author.length === 0 || form.author === ""
                      ? "#E4E3EB"
                      : "#EA1919"
                  }`,
                  borderRadius: "12px",
                  background:
                    form.author.length >= 4 &&
                    form.author.split(" ").length >= 2 &&
                    isGeorgianSymbol(form.author.trim())
                      ? "#F8FFF8"
                      : form.author.length === 0
                      ? "#FCFCFD"
                      : "#FAF2F3",
                }}
              />
              <div>
                <li
                  className="blog-inputs-bullet-points"
                  style={{
                    color:
                      form.author.length >= 4
                        ? "#14D81C"
                        : form.author == ""
                        ? ""
                        : "#EA1919",
                  }}
                >
                  მინიმუმ 4 სიმბოლო
                </li>

                <li
                  className="blog-inputs-bullet-points"
                  style={{
                    color:
                      form.author.split(" ").length >= 2 &&
                      form.author.split(" ")?.[1]?.length !== 0
                        ? "#14D81C"
                        : form.author == ""
                        ? ""
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
                      : form.author == ""
                      ? ""
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
                    form.title.length >= 2
                      ? "#14D81C"
                      : form.title == ""
                      ? "#E4E3EB"
                      : "#EA1919"
                  }`,
                  borderRadius: "12px",
                  background:
                    form.title.length >= 2
                      ? "#F8FFF8"
                      : form.title.length === 0
                      ? "#FCFCFD"
                      : "#FAF2F3",
                }}
              />
              <div>
                <h3
                  className="blog-inputs-bullet-points"
                  style={{
                    color:
                      form.title.length >= 2
                        ? "#14D81C"
                        : form.title == ""
                        ? ""
                        : "#EA1919",
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
                  form.description.length >= 2
                    ? "#14D81C"
                    : form.description == ""
                    ? "#E4E3EB"
                    : "#EA1919"
                }`,
                borderRadius: "12px",
                background:
                  form.description.length >= 2
                    ? "#F8FFF8"
                    : form.description.length === 0
                    ? "#FCFCFD"
                    : "#FAF2F3",
              }}
            ></textarea>
            <h3
              className="blog-inputs-bullet-points"
              style={{
                color:
                  form.description.length >= 2
                    ? "#14D81C"
                    : form.description == ""
                    ? ""
                    : "#EA1919",
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

              {/* <ReactSVG src={calendarIcon} /> */}
              <input
                name="date"
                value={form.date}
                onChange={handleFormChange}
                type="date"
                className="blog-adder-inputs-input"
                style={{
                  border: `1px solid ${
                    form.date
                      ? "#14D81C"
                      : form.date == ""
                      ? "#E4E3EB"
                      : "#EA1919"
                  }`,
                  borderRadius: "12px",
                  background: form.date
                    ? "#F8FFF8"
                    : form.date.length === 0
                    ? "#FCFCFD"
                    : "#FAF2F3",
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
              <label className="blog-adder-inputs-label">კატეგორია *</label>
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
                  form.email.endsWith("@redberry.ge") && form.email.length > 0
                    ? "#14D81C"
                    : form.email.length === 0
                    ? "#E4E3EB"
                    : "#EA1919"
                }`,
                background:
                  form.email.endsWith("@redberry.ge") && form.email.length > 0
                    ? "#F8FFF8"
                    : form.email.length === 0
                    ? "#FCFCFD"
                    : "#FAF2F3",
              }}
            />
            {!form.email.endsWith("@redberry.ge") && form.email.length > 0 && (
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
          type={"submit"}
          disabled={
            !base64String ||
            !form.author ||
            form.author.length < 4 ||
            form.author.split(" ").length < 2 ||
            form.author.split(" ")?.[1]?.length == 0 ||
            !form.title ||
            form.title.length < 2 ||
            !form.description ||
            form.description.length < 2 ||
            !form.date ||
            form.category.length < 1 ||
            (form.email && !form.email.endsWith("@redberry.ge"))
          }
          onClick={handleBlogSubmitter}
          style={{
            backgroundColor:
              !base64String ||
              !form.author ||
              form.author.length < 4 ||
              form.author.split(" ").length < 2 ||
              form.author.split(" ")?.[1]?.length == 0 ||
              !isGeorgianSymbol(form.author) ||
              !form.title ||
              form.title.length < 2 ||
              !form.description ||
              form.description.length < 2 ||
              !form.date ||
              form.category.length < 1 ||
              (form.email && !form.email.endsWith("@redberry.ge"))
                ? "#E4E3EB"
                : "#5D37F3",
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
    </form>
  );
};

export default BerryBlogAdderInputs;
