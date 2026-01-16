import { Link } from "react-router-dom";
import { FOOTER } from "../../../shared/constants/FOOTER";
import { Logo } from "../branding/Logo";
import { GithubIcon } from "../../assets/customIcons/GithubIcon";
import { TwitterIcon } from "../../assets/customIcons/TwitterIcon";

export const Footer = () => {
  return (
    <div className="w-full flex justify-between font-inter bg-base-200 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 py-8">
      <div className="flex flex-col gap-8 max-w-50">
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

      <div className="">
        <h1 className="text-lg font-semibold">Product</h1>
      </div>

      <div className="">
        <h1 className="text-lg font-semibold">Legal</h1>
      </div>

      <div className="">
        <h1 className="text-lg font-semibold">Contact</h1>
      </div>
    </div>
  );
};
