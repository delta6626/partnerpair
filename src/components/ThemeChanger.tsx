import { Sun, Moon, MonitorCog } from "lucide-react";
import type { AppTheme } from "../types/AppTheme";
import { useState, useEffect } from "react";

export const ThemeChanger = () => {
  const [prefersLight, setPrefersLight] = useState<Boolean>(false);

  function handleThemeChange(theme: AppTheme) {
    if (theme === "system") {
      document.documentElement.setAttribute(
        "data-theme",
        prefersLight ? "light" : "dark"
      );
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    setPrefersLight(mq.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersLight(e.matches);
    };

    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    handleThemeChange("system");
  }, [prefersLight]);

  return (
    <div className="">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square"></div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 shadow-sm"
        >
          <button
            className="btn flex items-center justify-start"
            onClick={() => {
              handleThemeChange("light");
            }}
          >
            <Sun size={20} />
            Light
          </button>
          <button
            className="btn flex items-center justify-start"
            onClick={() => {
              handleThemeChange("dark");
            }}
          >
            <Moon size={20} />
            Dark
          </button>
          <button
            className="btn flex items-center justify-start"
            onClick={() => {
              handleThemeChange("system");
            }}
          >
            <MonitorCog size={20} />
            System
          </button>
        </ul>
      </div>
    </div>
  );
};
