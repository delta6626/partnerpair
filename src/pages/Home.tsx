import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <div className="w-full h-[100vh] bg-base-300 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="py-4">
        <Navbar></Navbar>
      </div>
    </div>
  );
};
