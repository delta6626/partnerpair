import { Link } from "react-router-dom";

export const Logo = ({ link }: { link?: string }) => {
  return (
    <Link to={link ?? "/"} className="font-semibold text-2xl">
      PartnerPair
    </Link>
  );
};
