import { useEffect, useRef, useState } from "react";
import { loadCityNames } from "../../utils/loadCityNames";
import { trimAllSpaces } from "../../utils/trimAllSpaces";

export const LocationPicker = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const citiesRef = useRef<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await loadCityNames();
      if (typeof cities === "string") {
        setError(true);
        return;
      }
      citiesRef.current = cities;
    };

    fetchCities();
  }, []);

  return (
    <div className="mt-4 flex flex-col items-start justify-between">
      <p className="mb-2">{forCurrentUser ? "Your Location" : "Preferred Cofounder Locations"}</p>
      <input
        type="text"
        className="input"
        placeholder="Search a city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => {
          if (searchTerm.length >= 4 && filteredCities.length > 0) setDropdownOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => setDropdownOpen(false), 150);
        }}
      />
      {dropdownOpen && (
        <ul className="h-200 overflow-scroll bg-base-300 max-h-200 max-w-100 mt-1">
          {filteredCities.map((city) => (
            <li key={city} className="p-1 hover:bg-base-200 cursor-pointer">
              {city}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 mt-2">Failed to load cities.</p>}
    </div>
  );
};
