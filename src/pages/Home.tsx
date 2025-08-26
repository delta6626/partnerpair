import Loader from "../components/Loader";
import { Navbar } from "../components/navigation/Navbar";

export const Home = () => {
  return (
    <div className="w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <Navbar></Navbar>
      </div>
    </div>
  );
};
