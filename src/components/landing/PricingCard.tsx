import { Check } from "lucide-react";
import { IconText } from "./IconText";
import { Link } from "react-router-dom";

export const PricingCard = ({
  tierName,
  tierSubtitle,
  tierPrice,
  tierFeatures,
  tierLink,
  isRecommended,
}: {
  tierName: string;
  tierSubtitle: string;
  tierPrice: string;
  tierFeatures: string[];
  tierLink: string;
  isRecommended: boolean;
}) => {
  return (
    <div className={`w-lg max-w-lg border p-8 rounded-3xl ${isRecommended ? "border-primary" : "border-base-100"}`}>
      <h1 className="text-3xl">{tierName}</h1>
      <h1 className="text-lg text-accent">{tierSubtitle}</h1>
      <h1 className="text-3xl font-medium my-4">
        {`$${tierPrice}`}
        <span className="text-accent text-sm">{` /month`}</span>
      </h1>

      {tierFeatures.map((tier, index) => {
        return <IconText key={index} icon={Check} text={tier}></IconText>;
      })}

      <Link to={`/signup/${tierLink}`} className={`btn mt-4 w-full ${isRecommended ? "btn-primary" : ""}`}>
        Get started
      </Link>
    </div>
  );
};
