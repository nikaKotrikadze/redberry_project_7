import { create } from "zustand";
interface SuccessfulLoginRequestStoreInterface {
  isSuccessful: boolean;
  email: string | null;
  setIsSuccessful: (email: string) => void;
  clearSuccessfulLogin: () => void;
}

interface LoginModalStoreInterface {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useLoginModalStore = create<LoginModalStoreInterface>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export const useSuccessfulLoginRequestStore =
  create<SuccessfulLoginRequestStoreInterface>((set) => ({
    isSuccessful: localStorage.getItem("isSuccessful") === "true" || false,
    email: localStorage.getItem("email") || null,
    setIsSuccessful: (email: string) => {
      localStorage.setItem("isSuccessful", "true");
      localStorage.setItem("email", email);
      set({ isSuccessful: true, email });
    },
    clearSuccessfulLogin: () => {
      localStorage.removeItem("isSuccessful");
      localStorage.removeItem("email");
      set({ isSuccessful: false, email: null });
    },
  }));
