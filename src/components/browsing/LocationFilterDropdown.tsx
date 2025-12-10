import { defaultCountries, FlagImage, parseCountry } from "react-international-phone";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const LocationFilterDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2"></ul>
    </div>
  );
};
