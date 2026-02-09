import { CircleStar } from "lucide-react";
import { Link } from "react-router-dom";

export const UpgradeTierButton = ({ className }: { className?: string }) => {
  return (
    <Link to={"/upgrade"} className={`btn btn-primary ${className ?? ""}`}>
      <CircleStar size={20} /> Get Pro
    </Link>
  );
};
