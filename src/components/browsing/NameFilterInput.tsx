import { BROWSE } from "../../../shared/constants/BROWSE";

export const NameFilterInput = () => {
  return <input type="text" className="input bg-base-200 border-none" placeholder={BROWSE.NAME_SEARCH_PLACEHOLDER} />;
};
