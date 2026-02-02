import { defaultCountries, FlagImage, parseCountry } from "react-international-phone";
import { ChevronDown, Globe } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";
import { useEffect, useMemo } from "react";
import type { UserTier } from "../../../shared/types/UserTier";
import { ProBadge } from "../user/ProBadge";

export const LocationFilterDropdown = ({ userTier }: { userTier: UserTier }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get(BROWSE.PARAM_LOCATION) ?? BROWSE.PARAM_VALUE_ANY_COUNTRY;

  const countriesObject = useMemo(() => {
    const countries: Record<string, string> = {};

    defaultCountries.forEach((countryArray) => {
      countries[countryArray[1]] = countryArray[0];
    });

    return countries;
  }, []);

  const isValidCountry = (countryCode: string) => {
    return countryCode in countriesObject;
  };

  const setLocation = (country: string) => {
    searchParams.set(BROWSE.PARAM_LOCATION, country);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!(location === BROWSE.PARAM_VALUE_ANY_COUNTRY) && !isValidCountry(location)) {
      setLocation(BROWSE.PARAM_VALUE_ANY_COUNTRY);
    }
  }, [location]);

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn w-full flex justify-between" disabled={userTier === "Basic"}>
        {userTier === "Basic" && <ProBadge />}
        <p className="text-left w-25 max-w-25 text-nowrap overflow-hidden text-ellipsis">
          {location === BROWSE.PARAM_VALUE_ANY_COUNTRY ? "Anywhere" : countriesObject[location]}
        </p>
        <ChevronDown size={20} />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-10 w-80 mt-2 max-h-80 grid grid-cols-1 overflow-y-auto scrollbar-thin border border-base-100"
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
