export const Navbar = () => {
  return (
    <header className="font-raleway flex align-center items-center justify-between">
      <div className="font-bold text-xl">PartnerPair</div>
      <div className="hidden md:flex">
        <a href="" className="btn">
          Product
        </a>
        <a href="" className="btn">
          Pricing
        </a>
        <a href="" className="btn">
          Blogs
        </a>
        <a href="" className="btn">
          Sign Up
        </a>
        <a href="" className="btn">
          Log In
        </a>
      </div>
    </header>
  );
};
