import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import { UpgradeTierButton } from "../user/UpgradeTierButton";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { SignOut } from "../user/SignOut";

export const MainNavbarNavigationItems = ({ forMobile }: { forMobile?: boolean }) => {
  const { user, loading } = useInitializeUser();

  const navClass = ({ isActive }: NavLinkRenderProps) => {
    return `btn bg-transparent border-none hover:text-base-content ${isActive ? "" : "text-accent"}`;
  };

  return (
    <div className={`${forMobile ? "flex flex-col" : ""}`}>
      {!loading && user?.basicInfo.tier !== "Pro" && <UpgradeTierButton className={`${forMobile ? "mt-4" : ""}`} />}

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

      {forMobile && (
        <NavLink to={"/settings"} className={navClass}>
          Settings
        </NavLink>
      )}

      {forMobile && <SignOut applyMinimumWidth={false} />}

      {/* <NavLink to="/blogs" className={navClass}>
        Blogs
      </NavLink> */}
    </div>
  );
};
