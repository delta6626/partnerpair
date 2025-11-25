import { ProfileStatusMessage } from "./user/ProfileStatusMessage";

export const BrowseHeader = () => {
  return (
    <div className="py-8">
      <div className="mb-4">
        <ProfileStatusMessage />
      </div>

      <div className="">
        <h1 className="text-2xl font-bold">Browse</h1>
      </div>
    </div>
  );
};
