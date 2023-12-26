import React from "react";

const BerryTitleInput = ({ form, handleFormChange }: any) => {
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
        name="title"
        value={form.title}
        onChange={handleFormChange}
        placeholder="შეიყვანეთ სათაური"
        className="blog-adder-inputs-input"
        style={{
          border: `1px solid ${
            form.title.length >= 2
              ? "#14D81C"
              : form.title === ""
              ? "#E4E3EB"
              : "#EA1919"
          }`,
          borderRadius: "12px",
          background:
            form.title.length >= 2
              ? "#F8FFF8"
              : form.title.length === 0
              ? "#FCFCFD"
              : "#FAF2F3",
        }}
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
