import { Sun, Moon, SunMoon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import type { ThemeChangerProps } from "../types/ThemeChangerProps";

export const ThemeChanger = ({ forMobile }: ThemeChangerProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={forMobile ? "w-full" : ""}>
      <div
        className={`dropdown dropdown-bottom dropdown-end ${
          forMobile ? "w-full" : ""
        }`}
      >
        <div
          tabIndex={0}
          role="button"
          className={forMobile ? "btn w-full" : "btn btn-square"}
        >
          {/* Icon for theme changer button */}

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
          {/* Theme options  */}

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
