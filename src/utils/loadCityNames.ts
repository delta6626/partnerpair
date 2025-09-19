export const loadCityNames = async () => {
  const URL = "https://cdn.jsdelivr.net/gh/delta6626/all-countries-and-cities-json@latest/countries.min.json";
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("An error occured fetching the data.");
    const data = await response.json();
    return data as string[];
  } catch (error) {
    return error as string;
  }
};
