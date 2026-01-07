import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { ChangeEvent } from "react";

export const NameFilterInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get(BROWSE.PARAM_NAME) ?? "";

  const handleNameParamChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      searchParams.delete(BROWSE.PARAM_NAME);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(BROWSE.PARAM_NAME, e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <input
      type="text"
      value={name}
      className="input"
      placeholder={BROWSE.NAME_SEARCH_PLACEHOLDER}
      onChange={handleNameParamChange}
    />
  );
};
