import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { CategoryInterface } from "../../../types/BerryBlogTypes";
import { ReactSVG } from "react-svg";
import removeCategoryIcon from "../../../images/removeCategoryIcon.svg";
import ArrowDownCategoryIcon from "../../../images/ArrowDownCategory.svg";
interface Option {
  name: string;
  id: number;
}

const BerryBlogMultiSelector = ({ form, setForm, options }: any) => {
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const focusedStyles = {
    border: "1.5px solid #5D37F3",
    background: `url(${ArrowDownCategoryIcon}) right 12px center no-repeat #F7F7FF`,
    borderRadius: "12px",
  };

  useEffect(() => {
    const initiallySelectedCategories = options.filter(
      (option: CategoryInterface) => {
        return form.category.includes(option.id);
      }
    );
    setSelectedValues(initiallySelectedCategories);
  }, [form.category, options]);

  const onSelect = (selectedList: Option[], selectedItem: Option) => {
    setSelectedValues(selectedList);
    setForm((prevForm: any) => ({
      ...prevForm,
      category: selectedList.map((val) => val.id),
    }));
  };

  const onRemove = (selectedList: Option[], removedItem: Option) => {
    setSelectedValues(selectedList);
    setForm((prevForm: any) => ({
      ...prevForm,
      category: selectedList.map((val) => val.id),
    }));
  };

  const customStyles = {
    searchBox: {
      display: "flex",
      textDecoration: "none",
      alignItems: "center",
      gap: 8,
      minHeight: "44px",
      borderRadius: "12px",
      paddingLeft: 16,
      paddingRight: 0,
      background: `url(${ArrowDownCategoryIcon}) right 12px center no-repeat ${
        form.category.length >= 1 ? "#F8FFF8" : "#fcfcfd"
      }`,

      backgroundColor: form.category.length >= 1 ? "#F8FFF8" : "#fcfcfd",

      overflowX: "auto",

      border: `1px solid ${
        form.category.length === 0
          ? "#E4E3EB"
          : form.category.length >= 1
          ? "#14D81C"
          : "#EA1919"
      }`,
      ...(isFocused && form.category.length === 0 ? focusedStyles : {}),
    },
    optionContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "left",
      textDecoration: "none",
      listStyleType: "none",
      gap: 8,
      border: "1px solid #E4E3EB",
      padding: "16px",
      width: "288px",
      maxHeight: "144px",
      borderRadius: "12px",
      backgroundColor: "#FFFFFF",
    },
    option: {
      padding: 0,
      margin: 0,
      background: "transparent",
    },
    chips: {
      padding: 0,
      margin: 0,
      borderRadius: "30px",
      background: "transparent",
    },
    inputField: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
    },
  };

  return (
    <div onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <Multiselect
        options={options}
        selectedValues={options.filter((option: CategoryInterface) => {
          return form.category.includes(option.id);
        })}
        onSelect={onSelect}
        displayValue="value"
        placeholder={"აირჩიეთ კატეგორია"}
        hidePlaceholder={form.category.length > 0}
        style={customStyles}
        customCloseIcon
        selectedValueDecorator={(value, object) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "30px",
                gap: "8px",
                padding: "8px 12px",
                backgroundColor: object.background_color,
              }}
            >
              <h1
                style={{
                  color: object.text_color,
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
              >
                {value}
              </h1>
              <button
                type="button"
                onClick={() => {
                  onRemove(
                    selectedValues.filter((v) => v.id !== object.id),
                    object
                  );
                }}
                style={{
                  backgroundColor: object.background_color,
                  color: "white",
                }}
              >
                <ReactSVG src={removeCategoryIcon} />
              </button>
            </div>
          );
        }}
        optionValueDecorator={(value, object) => {
          return (
            <h1
              style={{
                color: object.text_color,
                backgroundColor: object.background_color,
                padding: "8px 16px 8px 16px",
                borderRadius: "30px",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              {value}
            </h1>
          );
        }}
      />
    </div>
  );
};

export default BerryBlogMultiSelector;
