import { create } from "zustand";

export const useLoginModalStore = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export const useSuccessfulLoginRequestStore = create((set) => ({
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
