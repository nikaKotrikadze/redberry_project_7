import React from "react";
import Select from "react-select";
import {
  CategoryInterface,
  SelectedCategoryInterface,
} from "../../../types/BerryBlogTypes";

const BerryBlogSelector = ({ form, setForm, options }: any) => {
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
      height: "44px",
      overflowX: "auto",
    }),

    menu: (baseStyles: any) => ({
      ...baseStyles,
      whiteSpace: "nowrap",
      overflowX: "auto",
    }),

    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      return {
        background: data.background_color,
        color: data.text_color,
        borderRadius: "20px",
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

  return (
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
};

export default BerryBlogSelector;
