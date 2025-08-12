import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="font-raleway flex align-center items-center justify-between">
      <div className="font-bold text-2xl">PartnerPair</div>
      <div className="hidden sm:flex">
        <a
          href=""
          className="btn bg-transparent border-none hover:text-primary"
        >
          Product
        </a>
        <a
          href=""
          className="btn bg-transparent border-none hover:text-primary"
        >
          Pricing
        </a>
        <a
          href=""
          className="btn bg-transparent border-none hover:text-primary"
        >
          Blogs
        </a>
        <a
          href=""
          className="btn bg-transparent border-none hover:text-primary"
        >
          Log In
        </a>
        <a href="" className="btn btn-primary border-none">
          Sign Up
        </a>
      </div>
      <div className="sm:hidden">
        <button className="btn btn-square">
          <Menu />
        </button>
      </div>
    </header>
  );
};
