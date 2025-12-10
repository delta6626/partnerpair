import { defaultCountries, FlagImage, parseCountry } from "react-international-phone";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const LocationFilterDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        <ChevronDown size={20} />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-80 mt-2 max-h-80 grid grid-cols-1 overflow-y-auto"
      >
        {defaultCountries.map((c) => {
          const parsed = parseCountry(c);
          return (
            <li key={parsed.iso2}>
              <button className="flex items-center px-4 py-3">
                <FlagImage iso2={parsed.iso2} style={{ width: "20px" }} />
                <p>{parsed.name}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
