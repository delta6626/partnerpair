import { useLayoutEffect, useState } from "react";
import type { AppTheme } from "../../shared/types/AppTheme";

export const useTheme = () => {
  // Load existing theme preference

  const [theme, setTheme] = useState<AppTheme>(() => {
    const existingThemePreference = localStorage.getItem("theme");

    if (existingThemePreference === null) {
      return "system";
    } else {
      return existingThemePreference as AppTheme;
    }
  });

  // Apply desired theme before the DOM is painted

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};
