import { Navbar } from "../components/navigation/Navbar";
import { SIGNUP } from "../constants/SIGNUP";

export const Signup = () => {
  return (
    <div className="font-inter w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <Navbar />
      </div>

      <div className="pt-16 w-full flex flex-col items-center">
        <h1 className="font-bold text-4xl">{SIGNUP.greeting}</h1>
      </div>
    </div>
  );
};
