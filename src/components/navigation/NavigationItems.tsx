import { Link } from "react-router-dom";
import type { NavigationItemsProps } from "../../../shared/types/navigationItemsProps";

export const NavigationItems = ({ forMobile }: NavigationItemsProps) => {
  return (
    // The menu items of the Navbar

    <div className={forMobile ? "flex flex-col" : ""}>
      <a href="#pricing" className="btn bg-transparent border-none text-accent hover:text-base-content">
        Pricing
      </a>
      <a href="#faq" className="btn bg-transparent border-none text-accent hover:text-base-content">
        FAQ
      </a>
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
