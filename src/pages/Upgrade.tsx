import { Crown, X } from "lucide-react";
import { IconText } from "../components/landing/IconText";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { PricingCard } from "../components/landing/PricingCard";
import { HOME } from "../../shared/constants/HOME";
import { Link, useSearchParams } from "react-router-dom";
import { FOOTER } from "../../shared/constants/FOOTER";
import { httpsCallable } from "firebase/functions";
import { functions } from "../services/firebaseConfig";
import { useEffect, useState } from "react";
import { MODALS } from "../../shared/constants/MODALS";

export const Upgrade = () => {
  useTheme();

  const createSubscription = httpsCallable(functions, "createSubscription");

  const { user, loading } = useInitializeUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const [subscriptionLinkLoading, setSubscriptionLinkLoading] = useState<boolean>(false);

  const approvedStatus = searchParams.get("approved") ?? null;

  const handleApprovalFailDismiss = () => {
    searchParams.delete("approved");
    setSearchParams(searchParams);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSubscribeButtonClick = async () => {
    if (subscriptionLinkLoading) return;

    try {
      setSubscriptionLinkLoading(true);
      const response = await createSubscription();
      const approvalLink = response.data as string;
      window.location.href = approvalLink;
    } catch (error) {
      const errorModal = document.getElementById(
        MODALS.SUBSCRIPTION_CREATION_FAILED_ERROR_MODAL.ID,
      ) as HTMLDialogElement;
      errorModal.showModal();
      console.error("Subscription creation failed:", error);
    } finally {
      setSubscriptionLinkLoading(false);
    }
  };

  useEffect(() => {
    if (approvedStatus === "1" && user?.basicInfo.tier === "Pro") {
      searchParams.delete("approved");
      setSearchParams(searchParams);
    }
  }, [approvedStatus, user, searchParams]);

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (user?.basicInfo.tier === "Pro") {
    return (
      <div className="w-full min-h-[100vh] text-center font-inter bg-base-300 paddingContainer">
        <div className="py-4">
          <MainNavbar />
        </div>

        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <h1 className="text-4xl font-medium">Welcome to Pro.</h1>

          <h2 className="text-accent text-lg max-w-lg mx-auto mt-4">
            You’re now part of the Pro Club. Enjoy enhanced features designed to help you connect with the right
            co-founder faster and more confidently.
          </h2>

          <Link className="btn btn-primary mt-4" to={"/dashboard"}>
            Go to Dashboard
          </Link>

          <h2 className="text-accent max-w-lg mx-auto mt-8">
            If you experience any issues, feel free to{" "}
            <a
              href={`mailto:${FOOTER.PERSONAL_MAIL_ADDRESS}?subject=Pro%20Support%20Request`}
              className="text-primary underline"
            >
              contact us
            </a>{" "}
            anytime - we’re here to help.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100vh] font-inter bg-base-300 paddingContainer">
      <div className="py-4">
        <MainNavbar />
      </div>

      {approvedStatus != "1" && (
        <div className="w-full py-8 mt-4 flex flex-col items-center text-center gap-8">
          {approvedStatus === "0" && (
            <div className="flex items-center justify-between w-full bg-error/60 rounded-2xl p-4">
              <div className="text-start">
                <h1 className="">Subscription not completed</h1>
                <p>Your subscription wasn’t finalized. You can try again anytime.</p>
              </div>

              <button className="cursor-pointer" onClick={handleApprovalFailDismiss}>
                <X size={20} />
              </button>
            </div>
          )}

          <IconText icon={Crown} text={"Upgrade to Pro"} topTag={true} />

          <h1 className="text-4xl font-medium">Upgrade for a Superior Experience</h1>

          <h1 className="text-accent text-lg max-w-lg">
            PartnerPair Pro unlocks advanced features designed to help you connect with the right co-founder faster and
            more confidently.
          </h1>

          <div className="w-full flex flex-col-reverse lg:flex-row justify-center gap-4">
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
              showSubscribeButton={true}
              subscribeButtonLoading={subscriptionLinkLoading}
              handleSubscribeButtonClick={handleSubscribeButtonClick}
            />
          </div>
        </div>
      )}

      {approvedStatus === "1" && (
        <div className="w-full text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <h1 className="text-4xl text-center font-medium">Thank You.</h1>

          <h1 className="text-accent text-center text-lg mx-auto max-w-lg mt-4">
            Your subscription has been approved. We're finalizing your payment and activating your Pro features. If you
            don’t see your access update within a few moments, please refresh this page.
          </h1>

          <button className="btn btn-primary mt-4" onClick={handleRefresh}>
            Refresh
          </button>

          <h1 className="text-accent text-center mx-auto max-w-lg mt-16">
            Completed your payment but don’t see your Pro access yet? Please{" "}
            <a
              href={`mailto:${FOOTER.PERSONAL_MAIL_ADDRESS}?subject=Pro%20Access%20Not%20Activated`}
              className="text-primary underline"
            >
              email us
            </a>{" "}
            with the <span className="text-primary">subject “Pro Access Not Activated”</span> and we’ll take care of it
            right away.
          </h1>
        </div>
      )}
    </div>
  );
};
