import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/navigation/Navbar";

export const Home = () => {
  return (
    <div className="w-full font-inter min-h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <Navbar></Navbar>
      </div>

      <section className="py-32">
        <h1 className="text-6xl font-semibold">
          Great Ideas Deserve<br></br>
          <span className="text-primary">Great Partners</span>
        </h1>

        <h1 className="mt-8 text-lg text-accent max-w-lg">
          Discover and connect with co-founders who complement your skills and vision. Whether you’re starting up or
          joining one, this is where teams begin.
        </h1>

        <div className="mt-4 flex gap-4">
          <button className="btn btn-primary">
            Get started <ArrowRight size={20} />
          </button>

          <button className="btn">Watch Demo</button>
        </div>
      </section>
    </div>
  );
};
