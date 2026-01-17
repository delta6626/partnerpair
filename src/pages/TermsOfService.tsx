import { Navbar } from "../components/navigation/Navbar";

export const TermsOfService = () => {
  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-col font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
        <div className="py-4">
          <Navbar />
        </div>

        <div className="flex flex-col items-center">
          <div className="py-8 w-full max-w-200 mt-4">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-accent">Last Updated: January 18, 2026</p>

            <section className="mt-8">
              Welcome to PartnerPair (“PartnerPair”, “we”, “us”, or “our”). These Terms of Service (“Terms”) govern your
              access to and use of PartnerPair, a web-based co-founder matching platform owned and operated by an
              individual based in the United Arab Emirates. By creating an account or using PartnerPair, you agree to be
              bound by these Terms.
              <h1 className="pt-2">If you do not agree to these Terms, do not use PartnerPair.</h1>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
