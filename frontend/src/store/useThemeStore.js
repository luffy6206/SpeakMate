import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("SpeakMate-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("SpeakMate-theme", theme);
    set({ theme });
  },
}));
