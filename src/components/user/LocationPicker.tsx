import { useEffect, useRef, useState } from "react";
import { loadCityNames } from "../../utils/loadCityNames";

export const LocationPicker = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const citiesRef = useRef<string[]>([]);
  const [error, setError] = useState<boolean>(false);

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
    <div className="mt-4 flex items-center justify-between">
      <p className="">{forCurrentUser ? "Your Location" : "Preferred Cofounder Locations"}</p>
      <input type="text" className="input" placeholder="Search a city" />
    </div>
  );
};
