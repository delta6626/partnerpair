import { Link } from "react-router-dom";
import { FOOTER } from "../../../shared/constants/FOOTER";
import { Logo } from "../landing/Logo";
import { GithubIcon } from "../../assets/customIcons/GithubIcon";
import { TwitterIcon } from "../../assets/customIcons/TwitterIcon";
import { HOME } from "../../../shared/constants/HOME";

export const Footer = () => {
  return (
    <div className="w-full flex flex-wrap justify-between font-inter bg-base-200 paddingContainer py-8">
      <div className="flex flex-col gap-8 max-w-50 min-w-50 p-4">
        <Logo />

        <div className="flex flex-col gap-8">
          <p className="text-accent">{FOOTER.TAG_LINE}</p>
          <div className="flex gap-4">
            <Link to={FOOTER.GITHUB_REPO_LINK}>
              <GithubIcon />
            </Link>

            <Link to={FOOTER.PERSONAL_TWITTER_LINK}>
              <TwitterIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 p-4 max-w-50 min-w-50">
        <h1 className="text-lg font-semibold">Product</h1>

        <div className="text-accent flex flex-col gap-2 font-semibold text-sm">
          <Link className="hover:text-base-content transition-all ease-in-out duration-200" to={"/settings"}>
            Manage Subscription
          </Link>

          <a
            className="hover:text-base-content transition-all ease-in-out duration-200"
            href={`#` + HOME.FEATURES_SECTION_ID}
          >
            Features
          </a>

          <a
            className="hover:text-base-content transition-all ease-in-out duration-200"
            href={`#` + HOME.PRICING_SECTION_ID}
          >
            Pricing
          </a>

          <a
            className="hover:text-base-content transition-all ease-in-out duration-200"
            href={`#` + HOME.FAQ_SECTION_ID}
          >
            FAQ
          </a>

          <Link
            className="hover:text-base-content transition-all ease-in-out duration-200"
            to={FOOTER.GITHUB_REPO_LINK}
          >
            Source code
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-8 font-semibold text-sm p-4 max-w-50 min-w-50">
        <h1 className="text-lg font-semibold">Legal</h1>

        <div className="text-accent flex flex-col gap-2">
          <Link className="hover:text-base-content transition-all ease-in-out duration-200" to={"/privacy-policy"}>
            Privacy Policy
          </Link>

          <Link className="hover:text-base-content transition-all ease-in-out duration-200" to={"/terms-of-service"}>
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-8 font-semibold text-sm p-4 max-w-50 min-w-50">
        <h1 className="text-lg font-semibold">Contact</h1>

        <div className="text-accent flex flex-col gap-2">
          <Link
            className="hover:text-base-content transition-all ease-in-out duration-200s"
            to={FOOTER.PERSONAL_GITHUB_LINK}
          >
            Developer Github
          </Link>

          <Link
            className="hover:text-base-content transition-all ease-in-out duration-200s"
            to={FOOTER.PERSONAL_TWITTER_LINK}
          >
            Twitter
          </Link>

          <Link
            className="hover:text-base-content transition-all ease-in-out duration-200s"
            to={`mailto:${FOOTER.PERSONAL_MAIL_ADDRESS}`}
          >
            Mail
          </Link>
        </div>
      </div>
    </div>
  );
};
