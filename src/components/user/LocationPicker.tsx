import { useEffect, useRef, useState } from "react";
import { loadCityNames } from "../../utils/loadCityNames";

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

  useEffect(() => {
    if (searchTerm.length >= 4) {
      // Filter cities only when the user has typed at least 2 characters
      const matches = citiesRef.current.filter((city) => city.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setFilteredCities(matches);
      setDropdownOpen(matches.length > 0); // open dropdown only if there are matches
    } else {
      setFilteredCities([]);
      setDropdownOpen(false);
    }
  }, [searchTerm]);

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
