import { CircleStar } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeTierButton = () => {
  return (
    <Link to={""} className="btn btn-primary">
      <CircleStar /> Get Pro
    </Link>
  );
};
