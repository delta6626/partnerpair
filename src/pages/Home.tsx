import { useEffect } from "react";
import { Navbar } from "../components/navigation/Navbar";

export const Home = () => {
  useEffect(() => {
    const prefersLight: Boolean = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    console.log(prefersLight);
  }, []);

  return (
    <div className="w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <Navbar></Navbar>
      </div>
    </div>
  );
};
