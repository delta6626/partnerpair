import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import { UpgradeTierButton } from "../user/UpgradeTierButton";
import { useInitializeUser } from "../../hooks/useInitializeUser";

export const MainNavbarNavigationItems = () => {
  const { user, loading } = useInitializeUser();

  const navClass = ({ isActive }: NavLinkRenderProps) => {
    return `btn bg-transparent border-none hover:text-base-content ${isActive ? "" : "text-accent"}`;
  };

  return (
    <div>
      {!loading && user?.basicInfo.tier !== "Pro" && <UpgradeTierButton />}

      <NavLink to="/dashboard" className={navClass}>
        Dashboard
      </NavLink>

      <NavLink to="/browse" className={navClass}>
        Browse
      </NavLink>

      <NavLink to="/messages" className={navClass}>
        Messages
      </NavLink>

      <NavLink to="/forum" className={navClass}>
        Forum
      </NavLink>

      <NavLink to="/blogs" className={navClass}>
        Blogs
      </NavLink>
    </div>
  );
};
