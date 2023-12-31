import React, { useState } from "react";
import "./berryblogadderinputs.css";

const BerryAuthorInput = ({
  form,
  handleFormChange,
  isGeorgianSymbol,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const focusedStyles = {
    border: "1.5px solid #5D37F3",
    background: "#F7F7FF",
  };

  const hoverStyles = {
    background: "#F9F9FA",
  };

  const isValid =
    form.author.length >= 4 &&
    form.author.split(" ").length >= 2 &&
    form.author.split(" ")?.[1]?.length !== 0 &&
    isGeorgianSymbol(form.author.trim());

  const inputStyles = {
    border: `1px solid ${
      isValid ? "#14D81C" : form.author.length === 0 ? "#E4E3EB" : "#EA1919"
    }`,
    ...(isFocused && form.author.length === 0 ? focusedStyles : {}),
    borderRadius: "12px",
    background: isValid
      ? "#F8FFF8"
      : form.author.length === 0
      ? "#FCFCFD"
      : "#FAF2F3",
    outline: "none",
    ...(isHovered ? hoverStyles : {}),
  };

  return (
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
        ავტორი *
      </label>
      <input
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name="author"
        value={form.author}
        onChange={handleFormChange}
        placeholder="შეიყვანეთ ავტორი"
        className="blog-adder-inputs-input"
        style={inputStyles}
      />
      <div>
        <li
          className="blog-inputs-bullet-points"
          style={{
            color:
              form.author.length >= 4
                ? "#14D81C"
                : form.author === ""
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
                : form.author === ""
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
              : form.author === ""
              ? ""
              : "#EA1919",
          }}
        >
          მხოლოდ ქართული სიმბოლოები
        </li>
      </div>
    </div>
  );
};

export default BerryAuthorInput;
