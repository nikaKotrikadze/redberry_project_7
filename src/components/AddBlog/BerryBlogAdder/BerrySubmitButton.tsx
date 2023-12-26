import React from "react";

const BerrySubmitButton = ({
  base64String,
  form,
  handleBlogSubmitter,
  isGeorgianSymbol,
}: any) => {
  return (
    <button
      type={"submit"}
      disabled={
        !base64String ||
        !form.author ||
        form.author.length < 4 ||
        form.author.split(" ").length < 2 ||
        form.author.split(" ")?.[1]?.length === 0 ||
        !form.title ||
        form.title.length < 2 ||
        !form.description ||
        form.description.length < 2 ||
        !form.date ||
        form.category.length < 1 ||
        (form.email && !form.email.endsWith("@redberry.ge"))
      }
      onClick={handleBlogSubmitter}
      style={{
        backgroundColor:
          !base64String ||
          !form.author ||
          form.author.length < 4 ||
          form.author.split(" ").length < 2 ||
          form.author.split(" ")?.[1]?.length === 0 ||
          !isGeorgianSymbol(form.author) ||
          !form.title ||
          form.title.length < 2 ||
          !form.description ||
          form.description.length < 2 ||
          !form.date ||
          form.category.length < 1 ||
          (form.email && !form.email.endsWith("@redberry.ge"))
            ? "#E4E3EB"
            : "#5D37F3",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#FFFFFF",
        width: "288px",
        alignSelf: "flex-end",
      }}
    >
      გამოქვეყნება
    </button>
  );
};

export default BerrySubmitButton;
