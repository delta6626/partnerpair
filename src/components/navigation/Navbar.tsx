import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../branding/Logo";
import { NavigationItems } from "./NavigationItems";
import { ThemeChanger } from "../ThemeChanger";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);

  function handleMenuButtonClick(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="font-inter flex align-center items-center justify-between">
      <Logo />

      <div className="hidden sm:flex gap-4">
        <NavigationItems />
        <ThemeChanger />
      </div>

      {/* Hamburger menu icon for mobile devices */}

      <div className="sm:hidden">
        <button className="btn btn-square" onClick={handleMenuButtonClick}>
          <Menu />
        </button>
      </div>

      {/* Mobile menu */}

      {menuOpen && (
        <div className="px-8 py-4 fixed inset-0 sm:hidden z-10">
          <div className="flex justify-between items-center">
            <Logo />
            <button className="btn btn-square" onClick={handleMenuButtonClick}>
              <X />
            </button>
          </div>
          <NavigationItems forMobile={true} />
          <ThemeChanger />
        </div>
      )}
    </header>
  );
};
