import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import emailErrorIcon from "../../../images/emailErrorIcon.svg";

const BerryEmailInput = ({ form, handleFormChange }: any) => {
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
      form.email.endsWith("@redberry.ge") && form.email.length > 0
        ? "#14D81C"
        : form.email.length === 0
        ? "#E4E3EB"
        : "#EA1919"
    }`,
    ...(isFocused && form.email.length === 0 ? focusedStyles : {}),
    background:
      form.email.endsWith("@redberry.ge") && form.email.length > 0
        ? "#F8FFF8"
        : form.email.length === 0
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
        ელ-ფოსტა
      </label>
      <input
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name="email"
        type="email"
        value={form.email}
        onChange={handleFormChange}
        placeholder="Example@redberry.ge"
        className="blog-adder-inputs-input"
        style={inputStyles}
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
  );
};

export default BerryEmailInput;
