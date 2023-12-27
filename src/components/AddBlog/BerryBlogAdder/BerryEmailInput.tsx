import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import emailErrorIcon from "../../../images/emailErrorIcon.svg";

const BerryEmailInput = ({ form, handleFormChange }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverStyles = {
    background: "#F9F9FA",
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
          ...(isHovered ? hoverStyles : {}),
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
  );
};

export default BerryEmailInput;
