import React, { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import FolderAddIcon from "../../../images/folder-add.svg";
import { ReactSVG } from "react-svg";
import galleryIcon from "../../../images/galleryIcon.svg";
import removeImageIcon from "../../../images/removeImageIcon.svg";
import { useFileStore } from "./blogadder.store";

const BerryImageDragAndDrop = () => {
  const { uploadedFileName, setUploadedFile } = useFileStore();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];

        toBase64(file);
      }
    },
  });

  const handleRemoveImage = () => {
    localStorage.removeItem("uploadedFileName");
    localStorage.removeItem("base64String");

    setUploadedFile(null, null);
  };

  const toBase64 = (file: any) => {
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type. Please upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(",")[1];

      setUploadedFile(file, base64String);
      localStorage.setItem("base64String", base64String);
    };

    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
    };
  };

  return (
    <>
      {!uploadedFileName || uploadedFileName === "null" ? (
        <div
          {...getRootProps()}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "180px",
            backgroundColor: "#F4F3FF",
            border: "1px solid #85858D",
            borderStyle: "dashed",
            borderRadius: "12px",
            gap: "24px",
          }}
        >
          <input {...getInputProps()} accept="image/*" />
          <ReactSVG src={FolderAddIcon} />
          <p
            style={{
              color: "#1A1A1F",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
            }}
          >
            ჩააგდეთ ფაილი აქ ან{" "}
            <span
              style={{
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              აირჩიეთ ფაილი
            </span>
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            backgroundColor: "#F2F2FA",
            padding: "16px",
            borderRadius: "12px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ReactSVG src={galleryIcon} />
            <h1>
              <p
                style={{
                  color: "#1A1A1F",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
              >
                {uploadedFileName}
              </p>
            </h1>
          </div>
          <button onClick={handleRemoveImage} type={"button"}>
            <ReactSVG src={removeImageIcon} />
          </button>
        </div>
      )}
    </>
  );
};

export default BerryImageDragAndDrop;
