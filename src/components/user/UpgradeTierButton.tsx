import { CircleStar } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeTierButton = () => {
  return (
    <Link to={""} className="btn btn-primary">
      <CircleStar size={20} /> Get Pro
    </Link>
  );
};
