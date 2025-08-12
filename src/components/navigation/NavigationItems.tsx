import type { NavigationItemsProps } from "../../types/navigationItemsProps";

export const NavigationItems = ({ forMobile }: NavigationItemsProps) => {
  return (
    <div className={forMobile ? "flex flex-col" : ""}>
      <a href="" className="btn bg-transparent border-none hover:text-primary">
        Product
      </a>
      <a href="" className="btn bg-transparent border-none hover:text-primary">
        Pricing
      </a>
      <a href="" className="btn bg-transparent border-none hover:text-primary">
        Blogs
      </a>
      <a href="" className="btn bg-transparent border-none hover:text-primary">
        Log In
      </a>
      <a href="" className="btn btn-primary border-none">
        Sign Up
      </a>
    </div>
  );
};
