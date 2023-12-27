import React, { useState } from "react";

const BerryTextAreaInput = ({ form, handleFormChange }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverStyles = {
    background: "#F9F9FA",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          color: "#1A1A1F",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
        }}
      >
        აღწერა *
      </label>
      <textarea
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        name="description"
        value={form.description}
        onChange={handleFormChange}
        placeholder="შეიყვანეთ აღწერა"
        className="blog-adder-textarea"
        style={{
          border: `1px solid ${
            form.description.length >= 2
              ? "#14D81C"
              : form.description === ""
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
          ...(isHovered ? hoverStyles : {}),
        }}
      ></textarea>
      <h3
        className="blog-inputs-bullet-points"
        style={{
          color:
            form.description.length >= 2
              ? "#14D81C"
              : form.description === ""
              ? ""
              : "#EA1919",
        }}
      >
        მინიმუმ 2 სიმბოლო
      </h3>
    </div>
  );
};

export default BerryTextAreaInput;
