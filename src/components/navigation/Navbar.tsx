import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../branding/Logo";
import { NavigationItems } from "./NavigationItems";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  function handleMenuButtonClick(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="font-raleway flex align-center items-center justify-between">
      <Logo />
      <div className="hidden sm:flex">
        <NavigationItems />
      </div>
      <div className="sm:hidden">
        <button className="btn btn-square" onClick={handleMenuButtonClick}>
          <Menu />
        </button>
      </div>

      {menuOpen && (
        <div className="px-8 py-4 fixed inset-0 sm:hidden z-10">
          <div className="flex justify-between items-center">
            <Logo />
            <button className="btn btn-square" onClick={handleMenuButtonClick}>
              <X />
            </button>
          </div>
          <NavigationItems forMobile={true} />
        </div>
      )}
    </header>
  );
};
