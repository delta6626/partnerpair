import { Link } from "react-router-dom";

export const Logo = ({ link }: { link?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={"logo.svg"} alt="PartnerPair Logo" className="w-8 aspect-square" />
      <Link to={link ?? "/"} className="font-semibold text-2xl">
        PartnerPair
      </Link>
    </div>
  );
};
