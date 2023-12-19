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
      console.log(acceptedFiles);

      if (acceptedFiles.length === 1) {
        setUploadedFile(acceptedFiles[0]);
      }
    },
  });

  const handleRemoveImage = () => {
    setUploadedFile(null);
  };

  //   console.log("uploadedFile", uploadedFileName);

  return (
    <>
      {!uploadedFileName ? (
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
          <input {...getInputProps()} />
          <ReactSVG src={FolderAddIcon} />
          <p>Drag and drop a file here or click to browse.</p>
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
          <button onClick={handleRemoveImage}>
            <ReactSVG src={removeImageIcon} />
          </button>
        </div>
      )}
    </>
  );
};

export default BerryImageDragAndDrop;
