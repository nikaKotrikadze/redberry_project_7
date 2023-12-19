import { create } from "zustand";

interface FileStore {
  uploadedFileName: string | null;
  setUploadedFile: (file: File | null) => void;
}

export const useFileStore = create<FileStore>((set) => {
  const savedUploadedFileName = localStorage.getItem("uploadedFileName");

  set({ uploadedFileName: savedUploadedFileName });

  return {
    uploadedFileName: savedUploadedFileName,
    setUploadedFile: (file) => {
      const fileName: any = file ? file.name : null;
      localStorage.setItem("uploadedFileName", fileName);
      set({ uploadedFileName: fileName });
    },
  };
});
