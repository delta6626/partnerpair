export const Navbar = () => {
  return (
    <header className="font-raleway flex align-center items-center justify-between">
      <div className="font-bold text-xl">PartnerPair</div>
      <div className="hidden sm:flex">
        <a href="" className="btn bg-transparent border-none">
          Product
        </a>
        <a href="" className="btn bg-transparent border-none">
          Pricing
        </a>
        <a href="" className="btn bg-transparent border-none">
          Blogs
        </a>
        <a href="" className="btn bg-transparent border-none">
          Log In
        </a>
        <a href="" className="btn bg-primary border-none">
          Sign Up
        </a>
      </div>
      <div className="sm:hidden">
        <a href="" className="btn"></a>
      </div>
    </header>
  );
};
