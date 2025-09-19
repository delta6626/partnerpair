import { loadCityNames } from "../../utils/loadCityNames";

const cities = await loadCityNames();

export const LocationPicker = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="">{forCurrentUser ? "Your Location" : "Preferred Cofounder Locations"}</p>
      <input type="text" className="input" placeholder="Search a city" />
    </div>
  );
};
