import { Logo } from "../branding/Logo";

export const Footer = () => {
  return (
    <div className="w-full font-inter bg-base-200 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 py-8">
      <div className="">
        <Logo />
        <p className="text-accent">Because the best ideas aren’t built alone.</p>
        <div className=""></div>
      </div>
    </div>
  );
};
