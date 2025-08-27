import { Logo } from "../branding/Logo";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";

export const MainNavbar = () => {
  return (
    <div className="flex itesm-center justify-between">
      <div className="">
        <Logo />
      </div>
      <div className="">
        <MainNavbarNavigationItems />
      </div>
      <div className=""></div>
    </div>
  );
};
