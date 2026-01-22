import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/navigation/Navbar";

export const Home = () => {
  return (
    <div className="w-full font-inter min-h-[100vh] bg-base-300">
      <div className="py-4 paddingContainer">
        <Navbar></Navbar>
      </div>

      <div className="border-b border-base-100"></div>

      <section className="py-32 paddingContainer">
        <div className="flex flex-col gap-8">
          <h1 className="text-6xl font-semibold">
            Great Ideas Deserve<br></br>
            <span className="text-primary">Great Partners</span>
          </h1>

          <h1 className="text-lg text-accent max-w-lg">
            Discover and connect with co-founders who complement your skills and vision. Whether you’re starting up or
            joining one, this is where teams begin.
          </h1>

          <div className="flex gap-4">
            <button className="btn btn-primary">
              Get started <ArrowRight size={20} />
            </button>

            <button className="btn">Watch Demo</button>
          </div>
        </div>

        <div className=""></div>
      </section>
    </div>
  );
};
