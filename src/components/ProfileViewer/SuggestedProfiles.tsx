import { Link } from "react-router-dom";

export const SuggestedProfiles = () => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suggested Profiles</h1>
        <Link to="/browse" className="btn btn-primary">
          Browse all profiles
        </Link>
      </div>
    </div>
  );
};
