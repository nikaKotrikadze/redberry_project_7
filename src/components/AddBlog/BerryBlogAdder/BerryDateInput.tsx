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
      <label className="blog-adder-inputs-label">გამოქვეყნების თარიღი *</label>

      {/* <ReactSVG src={calendarIcon} /> */}
      <input
        name="date"
        value={form.date}
        onChange={handleFormChange}
        type="date"
        className="blog-adder-inputs-input"
        style={{
          border: `1px solid ${
            form.date ? "#14D81C" : form.date == "" ? "#E4E3EB" : "#EA1919"
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
