import { defaultCountries, parseCountry } from "react-international-phone";
import { useTempUserStore } from "../../store/useTempUserStore";
import type { ChangeEvent } from "react";

export const CountryPicker = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!tempUser) return;
    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, location: e.target.value } });
  };

  return (
    <div className="flex w-full items-center gap-2">
      <select className="select w-full" value={tempUser?.basicInfo.location ?? ""} onChange={handleLocationChange}>
        <option value={""} disabled>
          Select your country
        </option>

        {defaultCountries.map((country) => {
          const parsedCountry = parseCountry(country);
          return (
            <option key={parsedCountry.iso2} value={parsedCountry.name}>
              {parsedCountry.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
