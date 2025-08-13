import { Sun, Moon, MonitorCog } from "lucide-react";

export const ThemeChanger = () => {
  return (
    <div className="">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square"></div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 shadow-sm"
        >
          <button className="btn flex items-center justify-start">
            <Sun size={20} />
            Light
          </button>
          <button className="btn flex items-center justify-start">
            <Moon size={20} />
            Dark
          </button>
          <button className="btn flex items-center justify-start">
            <MonitorCog size={20} />
            System
          </button>
        </ul>
      </div>
    </div>
  );
};
