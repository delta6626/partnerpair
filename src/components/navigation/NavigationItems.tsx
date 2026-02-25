import { Link } from "react-router-dom";
import type { NavigationItemsProps } from "../../../shared/types/navigationItemsProps";
import { HOME } from "../../../shared/constants/HOME";

export const NavigationItems = ({ forMobile }: NavigationItemsProps) => {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // The menu items of the Navbar

    <div className={forMobile ? "flex flex-col" : ""}>
      <button
        className="btn bg-transparent border-none text-accent hover:text-base-content"
        onClick={() => {
          scrollToId(HOME.FEATURES_SECTION_ID);
        }}
      >
        Features
      </button>

      <button
        className="btn bg-transparent border-none text-accent hover:text-base-content"
        onClick={() => {
          scrollToId(HOME.PRICING_SECTION_ID);
        }}
      >
        Pricing
      </button>
      <button
        className="btn bg-transparent border-none text-accent hover:text-base-content"
        onClick={() => {
          scrollToId(HOME.FAQ_SECTION_ID);
        }}
      >
        FAQ
      </button>

      {/* <Link to={"/blogs"} className="btn bg-transparent border-none hover:text-primary">
        Blog
      </Link> */}

      <Link to={"/login"} className="btn bg-transparent border-none text-accent hover:text-base-content">
        Log In
      </Link>
      <Link to={"/signup"} className="btn btn-primary border-none">
        Sign Up
      </Link>
    </div>
  );
};
