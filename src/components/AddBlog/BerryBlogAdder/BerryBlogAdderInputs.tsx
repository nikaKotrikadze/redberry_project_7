import React, { useEffect, useState } from "react";
import "./berryblogadderinputs.css";
import BerryImageDragAndDrop from "./BerryImageDragAndDrop";
import { useCategoryStore } from "../../BlogNavigation/blogCategory.store";
import { $api } from "../../../utils/http";
import {
  useBlogAddedSuccessfullyModalStore,
  useFileStore,
} from "./blogadder.store";
import BerryBlogAdderSuccessModal from "./BerryBlogAdderSuccessModal";
import { CategoryInterface } from "../../../types/BerryBlogTypes";
import BerrySubmitButton from "./BerrySubmitButton";
import BerryEmailInput from "./BerryEmailInput";
import BerryDateInput from "./BerryDateInput";
import BerryTextAreaInput from "./BerryTextAreaInput";
import BerryTitleInput from "./BerryTitleInput";
import BerryAuthorInput from "./BerryAuthorInput";
import BerryBlogMultiSelector from "./BerryBlogMultiSelector";

const BerryBlogAdderInputs = () => {
  const { setCategories }: any = useCategoryStore();
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
                fontWeight: 500,
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
            <BerryAuthorInput
              form={form}
              handleFormChange={handleFormChange}
              isGeorgianSymbol={isGeorgianSymbol}
            />
            {/* title */}
            <BerryTitleInput form={form} handleFormChange={handleFormChange} />
          </div>
          {/* description */}
          <BerryTextAreaInput form={form} handleFormChange={handleFormChange} />
          {/* date and category */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* date */}
            <BerryDateInput form={form} handleFormChange={handleFormChange} />

            {/* category selector */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "280px",
              }}
            >
              <label
                style={{
                  color: "#1A1A1F",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                კატეგორია *
              </label>
              {/* <BerryBlogSelector
                form={form}
                setForm={setForm}
                options={options}
              /> */}
              <BerryBlogMultiSelector
                form={form}
                setForm={setForm}
                options={options}
              />
            </div>
          </div>
          {/* email */}
          <BerryEmailInput form={form} handleFormChange={handleFormChange} />
        </div>
        {/* button */}
        <BerrySubmitButton
          base64String={base64String}
          form={form}
          handleBlogSubmitter={handleBlogSubmitter}
          isGeorgianSymbol={isGeorgianSymbol}
        />
      </div>
    </form>
  );
};

export default BerryBlogAdderInputs;
