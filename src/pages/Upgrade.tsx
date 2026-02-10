import { Crown } from "lucide-react";
import { IconText } from "../components/landing/IconText";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { PricingCard } from "../components/landing/PricingCard";
import { HOME } from "../../shared/constants/HOME";

export const Upgrade = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (user?.basicInfo.tier === "Pro") {
    return (
      <div className="w-full min-h-[100vh] font-inter bg-base-300 paddingContainer">
        <div className="py-4">
          <MainNavbar />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100vh] font-inter bg-base-300 paddingContainer">
      <div className="py-4">
        <MainNavbar />
      </div>

      <div className="w-full py-8 mt-4 flex flex-col items-center text-center gap-8">
        <IconText icon={Crown} text={"Upgrade to Pro"} topTag={true} />

        <h1 className="text-4xl font-medium">Upgrade for a Superior Experience</h1>

        <h2 className="text-accent text-lg max-w-lg">
          PartnerPair Pro unlocks advanced features designed to help you connect with the right co-founder faster and
          more confidently.
        </h2>

        <div className="w-full flex justify-center gap-4">
          <PricingCard
            tierName={"Basic"}
            tierSubtitle={"Free access to core features"}
            tierPrice={"0"}
            tierFeatures={HOME.BASIC_FEATURES}
            tierLink={"basic"}
            isRecommended={false}
          />

          <PricingCard
            tierName={"Pro"}
            tierSubtitle={"Enhanced features for serious founders"}
            tierPrice={HOME.PRO_PRICE}
            tierFeatures={HOME.PRO_FEATURES}
            tierLink={"pro"}
            isRecommended={true}
          />
        </div>
      </div>
    </div>
  );
};
