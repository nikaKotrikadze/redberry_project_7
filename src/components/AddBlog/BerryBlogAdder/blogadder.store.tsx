import { create } from "zustand";

interface FileStore {
  uploadedFileName: string | null;
  base64String: string | null;
  setUploadedFile: (file: File | null, base64String: string | null) => void;
}

export const useFileStore = create<FileStore>((set) => {
  const savedUploadedFileName = localStorage.getItem("uploadedFileName");
  const savedBase64String = localStorage.getItem("base64String");

  set({
    uploadedFileName: savedUploadedFileName,
    base64String: savedBase64String,
  });

  return {
    uploadedFileName: savedUploadedFileName,
    base64String: savedBase64String,
    setUploadedFile: (file, base64String) => {
      const fileName: any = file ? file.name : null;

      localStorage.setItem("uploadedFileName", fileName);

      if (base64String !== null) {
        localStorage.setItem("base64String", base64String);
      }

      set({ uploadedFileName: fileName, base64String });
    },
  };
});
