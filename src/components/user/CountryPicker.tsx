import { defaultCountries, FlagImage } from "react-international-phone";

export const CountryPicker = () => {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn flex items-center gap-2 px-4 min-w-[100px]"></div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-80 mt-2 max-h-80 grid grid-cols-1 overflow-y-auto"
      ></div>
    </div>
  );
};
