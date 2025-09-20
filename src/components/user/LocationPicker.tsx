import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { loadCityNames } from "../../utils/loadCityNames";
import { trimAllSpaces } from "../../utils/trimAllSpaces";
import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";

export const LocationPicker = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const citiesRef = useRef<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const { tempUser, setTempUser } = useTempUserStore();

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

  const handleLocationSelect = (city: string) => {
    if (!tempUser) return;
    setSearchTerm(city);

    if (forCurrentUser) {
      setTempUser({
        ...tempUser,
        basicInfo: { ...tempUser.basicInfo, location: city },
      });
    } else {
      setTempUser({
        ...tempUser,
        matchingPreferences: { ...tempUser.matchingPreferences, preferredLocation: city },
      });
    }

    document.documentElement.focus();
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="mb-2">{forCurrentUser ? "Your Location" : "Preferred Cofounder Locations"}</p>
      <div className="dropdown">
        <input
          tabIndex={0}
          role="button"
          className="input w-80"
          type="text"
          placeholder="Search a city"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />

        {filteredCities.length > 0 && (
          <ul className="p-2 w-80 dropdown-content bg-base-200 rounded-box scrollbar-thin z-1 mt-2 max-h-50 overflow-y-scroll">
            {filteredCities.map((city) => (
              <button
                key={city}
                className="btn w-full flex items-center justify-start"
                onClick={() => {
                  handleLocationSelect(city);
                }}
              >
                {city}
              </button>
            ))}
          </ul>
        )}

        {error && <p className="text-red-500 mt-2">Failed to load cities.</p>}
      </div>
    </div>
  );
};
