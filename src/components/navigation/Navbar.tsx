import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../branding/Logo";
import { NavigationItems } from "./NavigationItems";
import { ThemeChanger } from "../ThemeChanger";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function handleMenuButtonClick(): void {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="font-inter flex align-center items-center justify-between">
      <Logo />

      <div className="hidden md:flex gap-4">
        <NavigationItems />
        <ThemeChanger forMobile={false} />
      </div>

      {/* Hamburger menu icon for mobile devices */}

      <div className="md:hidden">
        <button className="btn btn-square" onClick={handleMenuButtonClick}>
          <Menu />
        </button>
      </div>

      {/* Mobile menu */}

      {menuOpen && (
        <div className="bg-base-300 px-8 py-4 fixed inset-0 md:hidden z-10">
          <div className="flex justify-between items-center">
            <Logo />
            <button className="btn btn-square" onClick={handleMenuButtonClick}>
              <X />
            </button>
          </div>
          <NavigationItems forMobile={true} />
          <div className="mt-2">
            <ThemeChanger forMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
};
