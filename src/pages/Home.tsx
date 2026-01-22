import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/navigation/Navbar";
import { StepCard } from "../components/landing/StepCard";
import { Footer } from "../components/navigation/Footer";

export const Home = () => {
  return (
    <div className="w-full font-inter min-h-[100vh] bg-base-300">
      <div className="py-4 paddingContainer">
        <Navbar></Navbar>
      </div>

      <div className="border-b border-base-100"></div>

      <section className="py-16 paddingContainer flex items-center justify-between">
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
            <button className="btn btn-primary glowingItem">
              Get started <ArrowRight size={20} />
            </button>

            <button className="btn">Watch Demo</button>
          </div>
        </div>

        <div className="">
          <iframe
            className="w-2xl aspect-video rounded-3xl"
            src="https://www.youtube.com/embed/LDU_Txk06tM?si=XP-eVunKEDvgdu8x" // Change source later.
            title="PartnerPair Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-8 paddingContainer">
        <div className="w-full text-center">
          <h1 className="text-4xl font-medium">How it Works</h1>
          <h1 className="text-lg text-accent">Three steps to find your co-founder</h1>
        </div>

        <div className="flex items-center justify-between">
          <StepCard
            step="01"
            stepTitle="Create your profile"
            stepContent="Add your skills, experience, and what you're looking for in a co-founder."
          />

          <StepCard
            step="02"
            stepTitle="Browse and filter"
            stepContent="Search by location, skills, availability, commitment level, startup stage and more."
          />

          <StepCard
            step="03"
            stepTitle="Connect directly"
            stepContent="Message potential co-founders and start conversations that matter."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};
