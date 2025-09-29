import { useState } from "react";
import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";

export const PhoneInput = () => {
  const [value, setValue] = useState("");

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "us",
    value,
    countries: defaultCountries,
    onChange: (data) => {
      setValue(data.phone);
    },
  });

  return (
    <div className="flex w-full items-center gap-2">
      {/* Country dropdown */}
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn flex items-center gap-2 px-2 min-w-[70px]">
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
                  <span className="text-gray-500">+{parsed.dialCode}</span>
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
