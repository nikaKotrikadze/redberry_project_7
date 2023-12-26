import React from "react";

const BerryDateInput = ({ form, handleFormChange }: any) => {
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

      {/* <ReactSVG src={calendarIcon} /> */}
      <input
        name="date"
        value={form.date}
        onChange={handleFormChange}
        type="date"
        className="blog-adder-inputs-input"
        style={{
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
        }}
      />
    </div>
  );
};

export default BerryDateInput;
