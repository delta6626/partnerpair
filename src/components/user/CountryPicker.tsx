import { defaultCountries, FlagImage, parseCountry, type CountryIso2 } from "react-international-phone";
import { useTempUserStore } from "../../store/useTempUserStore";
import { ChevronDown } from "lucide-react";
import { countries } from "../../../shared/utils/countries";

export const CountryPicker = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  const handleLocationChange = (countryISOCode: CountryIso2) => {
    if (!tempUser) return;
    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, location: countries[countryISOCode] } });
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div className="dropdown dropdown-bottom w-full">
        <button tabIndex={0} role="button" className="btn w-full flex justify-between">
          <p className="text-left max-w-full text-nowrap overflow-hidden text-ellipsis">
            {tempUser?.basicInfo.location ? tempUser.basicInfo.location : "Select your country"}
          </p>
          <ChevronDown size={20} />
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-10 w-full mt-2 max-h-80 grid grid-cols-1 overflow-y-auto"
        >
          {defaultCountries.map((c) => {
            const parsed = parseCountry(c);
            return (
              <li key={parsed.iso2}>
                <button
                  className="flex items-center px-4 py-3"
                  onClick={() => {
                    handleLocationChange(parsed.iso2);
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
    </div>
  );
};
