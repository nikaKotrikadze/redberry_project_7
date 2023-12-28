import React, { useState } from "react";

const BerryTitleInput = ({ form, handleFormChange }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const focusedStyles = {
    border: "1.5px solid #5D37F3",
    background: "#F7F7FF",
  };

  const hoverStyles = {
    background: "#F9F9FA",
  };

  const inputStyles = {
    border: `1px solid ${
      form.title.length >= 2
        ? "#14D81C"
        : form.title === ""
        ? "#E4E3EB"
        : "#EA1919"
    }`,
    ...(isFocused && form.title.length === 0 ? focusedStyles : {}),
    borderRadius: "12px",
    background:
      form.title.length >= 2
        ? "#F8FFF8"
        : form.title.length === 0
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
        სათაური *
      </label>
      <input
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name="title"
        value={form.title}
        onChange={handleFormChange}
        placeholder="შეიყვანეთ სათაური"
        className="blog-adder-inputs-input"
        style={inputStyles}
      />
      <div>
        <h3
          className="blog-inputs-bullet-points"
          style={{
            color:
              form.title.length >= 2
                ? "#14D81C"
                : form.title === ""
                ? ""
                : "#EA1919",
          }}
        >
          მინიმუმ 2 სიმბოლო
        </h3>
      </div>
    </div>
  );
};

export default BerryTitleInput;
