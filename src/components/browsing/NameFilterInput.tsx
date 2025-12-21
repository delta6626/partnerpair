import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { ChangeEvent } from "react";

export const NameFilterInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNameParamChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <input
      type="text"
      className="input bg-base-200 border-none"
      placeholder={BROWSE.NAME_SEARCH_PLACEHOLDER}
      onChange={handleNameParamChange}
    />
  );
};
