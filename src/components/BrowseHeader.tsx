import { BROWSE } from "../../shared/constants/BROWSE";
import { ProfileStatusMessage } from "./user/ProfileStatusMessage";

export const BrowseHeader = () => {
  return (
    <div className="py-8">
      <div className="mb-4">
        <ProfileStatusMessage />
      </div>

      <div className="">
        <h1 className="font-bold text-3xl">Browse</h1>
        <h1 className="text-xl text-accent">{BROWSE.HEADER_SUB_TEXT}</h1>
      </div>
    </div>
  );
};
