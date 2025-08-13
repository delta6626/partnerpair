import { Sun, Moon, SunMoon } from "lucide-react";
import type { AppTheme } from "../types/AppTheme";
import { useState, useLayoutEffect } from "react";

export const ThemeChanger = () => {
  const [theme, setTheme] = useState<AppTheme>(() => {
    const existingThemePreference = localStorage.getItem("theme");
    if (existingThemePreference === null) {
      return "system";
    } else {
      return existingThemePreference as AppTheme;
    }
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square">
          {theme === "light" ? (
            <Sun size={20} />
          ) : theme === "dark" ? (
            <Moon size={20} />
          ) : (
            <SunMoon size={20} />
          )}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 shadow-sm"
        >
          <button
            className="btn flex items-center justify-start"
            onClick={() => {
              setTheme("light");
            }}
          >
            <Sun size={20} />
            Light
          </button>
          <button
            className="btn flex items-center justify-start"
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon size={20} />
            Dark
          </button>
          <button
            className="btn flex items-center justify-start"
            onClick={() => {
              setTheme("system");
            }}
          >
            <SunMoon size={20} />
            System
          </button>
        </ul>
      </div>
    </div>
  );
};
