import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";
import { useTempUserStore } from "../../store/useTempUserStore";

export const PhoneInput = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "us",
    value: tempUser.basicInfo.phone,
    countries: defaultCountries,
    onChange: (data) => {
      setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, phone: data.phone } });
    },
  });

  return (
    <div className="flex w-full items-center gap-2">
      {/* Country dropdown */}
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn flex items-center gap-2 px-4 min-w-[100px]">
          <FlagImage iso2={country.iso2} style={{ width: "20px" }} />
          <span>+{country.dialCode}</span>
        </div>

        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box z-10 w-64 mt-2 max-h-64 flex flex-row overflow-y-auto overflow-x-hidden"
        >
          {defaultCountries.map((c) => {
            const parsed = parseCountry(c);
            return (
              <li key={parsed.iso2}>
                <button className="flex items-center gap-2 px-2 py-1" onClick={() => setCountry(parsed.iso2)}>
                  <FlagImage iso2={parsed.iso2} style={{ width: "20px" }} />
                  <span>{parsed.name}</span>
                  <span className="text-accent">+{parsed.dialCode}</span>
                </button>
              </li>
            );
          })}
        </div>
      </div>

      {/* Phone number input */}
      <input
        ref={inputRef}
        type="tel"
        className="input input-bordered w-full"
        placeholder="Phone number"
        value={inputValue}
        onChange={handlePhoneValueChange}
      />
    </div>
  );
};
