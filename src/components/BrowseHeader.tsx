import { BROWSE } from "../../shared/constants/BROWSE";
import { ProfileStatusMessage } from "./user/ProfileStatusMessage";

export const BrowseHeader = () => {
  return (
    <div className="py-8">
      <div className="mb-4">
        <ProfileStatusMessage />
      </div>

      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="font-bold text-3xl">Browse</h1>
          <p className="text-accent">{BROWSE.HEADER_SUB_TEXT}</p>
        </div>

        <div>
          <input className="input min-w-120" placeholder={BROWSE.SEARCH_PLACEHOLDER}></input>
        </div>

        <div className="">Filters</div>
      </div>
    </div>
  );
};
