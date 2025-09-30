import { defaultCountries, FlagImage, parseCountry } from "react-international-phone";
import { useTempUserStore } from "../../store/useTempUserStore";

export const CountryPicker = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  return (
    <div className="flex w-full items-center gap-2">
      <div className="dropdown dropdown-bottom w-full">
        <div tabIndex={0} role="button" className="btn flex items-center gap-2 px-4">
          {tempUser?.basicInfo.location === "" ? "Select your country" : tempUser?.basicInfo.location}
        </div>

        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-10 w-80 mt-2 max-h-80 grid grid-cols-1 overflow-y-auto"
        >
          {defaultCountries.map((country) => {
            const parsedCountry = parseCountry(country);
            return (
              <li key={parsedCountry.iso2}>
                <button className="flex items-center gap-2 px-2 py-1">
                  <FlagImage iso2={parsedCountry.iso2} style={{ width: "20px" }} />
                  <p>{parsedCountry.name}</p>
                </button>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};
