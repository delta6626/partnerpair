import { Link } from "react-router-dom";

export const MainNavbarNavigationItems = () => {
  return (
    <div className="">
      <Link to={"/dashboard"} className="btn bg-transparent border-none hover:text-primary">
        Dashboard
      </Link>
      <Link to={"/browse"} className="btn bg-transparent border-none hover:text-primary">
        Browse
      </Link>
      <Link to={"/messages"} className="btn bg-transparent border-none hover:text-primary">
        Messages
      </Link>
      <Link to={"/forum"} className="btn bg-transparent border-none hover:text-primary">
        Forum
      </Link>
      <Link to={"/blogs"} className="btn bg-transparent border-none hover:text-primary">
        Blogs
      </Link>
    </div>
  );
};
