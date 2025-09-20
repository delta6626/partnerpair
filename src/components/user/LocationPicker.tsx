import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { loadCityNames } from "../../utils/loadCityNames";
import { trimAllSpaces } from "../../utils/trimAllSpaces";
import { SETTINGS } from "../../constants/SETTINGS";

export const LocationPicker = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const citiesRef = useRef<string[]>([]);
  const [error, setError] = useState<boolean>(false);
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
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm]);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="mb-2">{forCurrentUser ? "Your Location" : "Preferred Cofounder Locations"}</p>
      <div className="dropdown">
        <input
          tabIndex={0}
          role="button"
          className="input w-60"
          type="text"
          placeholder="Search a city"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />

        <ul className="dropdown-content bg-base-200 rounded-box z-1 mt-2 max-h-50 overflow-y-scroll">
          {filteredCities.map((city) => (
            <button key={city} className="btn">
              {city}
            </button>
          ))}
        </ul>

        {error && <p className="text-red-500 mt-2">Failed to load cities.</p>}
      </div>
    </div>
  );
};
