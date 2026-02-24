import { Check, Minus } from "lucide-react";
import { IconText } from "./IconText";
import { GetStartedButton } from "./GetStartedButton";
import type { TierFeature } from "../../../shared/types/TierFeature";
import { Loader } from "../Loader";

export const PricingCard = ({
  tierName,
  tierSubtitle,
  tierPrice,
  tierFeatures,
  tierLink,
  isRecommended,
  showGetStartedButton,
  showSubscribeButton,
  subscribeButtonLoading,
  handleSubscribeButtonClick,
}: {
  tierName: string;
  tierSubtitle: string;
  tierPrice: string;
  tierFeatures: TierFeature[];
  tierLink?: string;
  isRecommended: boolean;
  showGetStartedButton?: boolean;
  showSubscribeButton?: boolean;
  subscribeButtonLoading?: boolean;
  handleSubscribeButtonClick?: () => void;
}) => {
  return (
    <div
      className={`w-full lg:w-lg border p-8 rounded-3xl bg-base-200 ${isRecommended ? "border-primary" : "border-base-100"}`}
    >
      <h1 className="text-3xl font-medium">{tierName}</h1>
      <h1 className="text-lg text-accent">{tierSubtitle}</h1>
      <h1 className="text-3xl font-medium my-4">
        {`$${tierPrice}`}
        <span className="text-accent text-sm">{` /month`}</span>
      </h1>

      {tierFeatures.map((tier, index) => {
        return (
          <IconText
            key={index}
            icon={tier.isLimited ? Minus : Check}
            text={tier.feature}
            iconClassName={tier.isLimited ? "text-warning" : ""}
          ></IconText>
        );
      })}

      {showGetStartedButton && (
        <GetStartedButton
          route={tierLink ? `/signup?tier=${tierLink}` : "/signup"}
          variant={isRecommended ? "btn-primary" : ""}
          className="mt-4 w-full"
        />
      )}

      {showSubscribeButton && (
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleSubscribeButtonClick}
          disabled={subscribeButtonLoading}
        >
          {subscribeButtonLoading ? <Loader /> : "Subscribe"}
        </button>
      )}
    </div>
  );
};
