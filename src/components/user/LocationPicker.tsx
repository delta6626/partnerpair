import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { loadCityNames } from "../../utils/loadCityNames";
import { trimAllSpaces } from "../../utils/trimAllSpaces";
import { SETTINGS } from "../../constants/SETTINGS";

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
    const normalizedSearch = trimAllSpaces(searchTerm).toLowerCase();

    if (normalizedSearch.length >= SETTINGS.MINIMUM_RENDER_CHARACTER_COUNT) {
      const matches = citiesRef.current.filter((city) =>
        trimAllSpaces(city).toLowerCase().startsWith(normalizedSearch)
      );
      setFilteredCities(matches);
      setDropdownOpen(matches.length > 0);
    } else {
      setFilteredCities([]);
      setDropdownOpen(false);
    }
  }, [searchTerm]);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.length >= SETTINGS.MINIMUM_RENDER_CHARACTER_COUNT && filteredCities.length > 0)
      setDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="mb-2">{forCurrentUser ? "Your Location" : "Preferred Cofounder Locations"}</p>
      <input
        type="text"
        className="input"
        placeholder="Search a city"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
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
