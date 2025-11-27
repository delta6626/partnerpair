import { Search } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";

export const SearchUser = () => {
  return (
    <>
      <div className="relative">
        <Search size={20} className="text-accent absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <input className="input pl-12 min-w-120" placeholder={BROWSE.SEARCH_PLACEHOLDER}></input>
      </div>

      <button className="btn">Filters</button>
    </>
  );
};
