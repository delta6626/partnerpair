import { defaultCountries, FlagImage, parseCountry } from "react-international-phone";
import { ChevronDown, Globe } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";
import { useMemo } from "react";

export const LocationFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get(BROWSE.PARAM_LOCATION) ?? BROWSE.PARAM_VALUE_ANY_COUNTRY;

  const countryISOCodes = useMemo(() => {
    return defaultCountries.map((countryArray) => countryArray[1]);
  }, []);

  const isValidCountry = (countryCode: string) => {
    return countryISOCodes.includes(countryCode);
  };

  const setLocation = (country: string) => {
    searchParams.set(BROWSE.PARAM_LOCATION, country);
    setSearchParams(searchParams);
  };

  if (!(location === BROWSE.PARAM_VALUE_ANY_COUNTRY) && !isValidCountry(location)) {
    setLocation(BROWSE.PARAM_VALUE_ANY_COUNTRY);
  }

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        {location}
        <ChevronDown size={20} />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-80 mt-2 max-h-80 grid grid-cols-1 overflow-y-auto"
      >
        <li key={"any"}>
          <button
            className="flex items-center px-4 py-3"
            onClick={() => {
              setLocation(BROWSE.PARAM_VALUE_ANY_COUNTRY);
            }}
          >
            <Globe size={20} className="text-secondary" />
            <p>Anywhere</p>
          </button>
        </li>
        {defaultCountries.map((c) => {
          const parsed = parseCountry(c);
          return (
            <li key={parsed.iso2}>
              <button
                className="flex items-center px-4 py-3"
                onClick={() => {
                  setLocation(parsed.iso2);
                }}
              >
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
