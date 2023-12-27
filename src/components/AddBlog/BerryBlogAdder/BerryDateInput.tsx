import React, { useState } from "react";

const BerryDateInput = ({ form, handleFormChange }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverStyles = {
    backgroundColor: "#F9F9FA",
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
        გამოქვეყნების თარიღი *
      </label>

      <input
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        name="date"
        value={form.date}
        onChange={handleFormChange}
        type="date"
        style={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 12,
          height: "44px",
          padding: "0px 16px",
          margin: 0,

          border: `1px solid ${
            form.date ? "#14D81C" : form.date === "" ? "#E4E3EB" : "#EA1919"
          }`,
          borderRadius: "12px",
          background: form.date
            ? "#F8FFF8"
            : form.date.length === 0
            ? "#FCFCFD"
            : "#FAF2F3",
          ...(isHovered ? hoverStyles : {}),
        }}
      />
    </div>
  );
};

export default BerryDateInput;
