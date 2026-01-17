import { FOOTER } from "../../shared/constants/FOOTER";
import { Footer } from "../components/navigation/Footer";
import { Navbar } from "../components/navigation/Navbar";
import { useTheme } from "../hooks/useTheme";

export const PrivacyPolicy = () => {
  useTheme();

  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-col font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
        <div className="py-4">
          <Navbar />
        </div>

        <div className="flex flex-col items-center">
          <div className="py-8 w-full max-w-200 mt-4">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-accent">Last Updated: January 17, 2026</p>

            <section className="mt-8">
              PartnerPair (“PartnerPair”, “we”, “us”, or “our”) is a web-based co-founder matching platform owned and
              operated by an individual based in the United Arab Emirates. PartnerPair is offered as an open-source,
              freemium platform with optional paid features. This Privacy Policy explains how we collect, use, store,
              disclose, and protect your personal data when you use PartnerPair. By creating an account or using the
              platform, you agree to the practices described in this Privacy Policy.
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">1. Information We Collect</h1>

              <h1 className="">
                We collect information you provide directly, information generated through your use of the platform, and
                limited technical data necessary for operation.
              </h1>

              <section>
                <h1 className="text-xl font-medium py-4">1.1 Required Information</h1>

                <h1 className="pb-2">The following information is required to create an account:</h1>
                <ul className=" list-disc pl-4">
                  <li>First name</li>
                  <li>Last name</li>
                  <li>Date of birth (to verify minimum age)</li>
                  <li>Email address</li>
                </ul>
              </section>

              <section>
                <h1 className="text-xl font-medium py-4">1.2 Optional Profile Information</h1>

                <h1 className="pb-2">
                  You may choose to provide additional information to improve matching quality and user experience,
                  including but not limited to:
                </h1>

                <ul className="list-disc pl-4">
                  <li>Phone number</li>
                  <li>Location</li>
                  <li>Profile image</li>
                  <li>Headline and biography</li>
                  <li>Skills, roles, availability, and commitment level</li>
                  <li>Education history</li>
                  <li>Startup information and preferences</li>
                  <li>Social links (e.g. LinkedIn, GitHub, Twitter, personal website)</li>
                </ul>

                <h1 className="pt-2">
                  Providing this information is optional but strongly recommended for effective matching.
                </h1>
              </section>

              <section>
                <h1 className="text-xl font-medium py-4">1.3 Account & Activity Data</h1>

                <h1 className="pb-2">
                  We automatically generate and store the following information to operate, secure, and improve the
                  platform:
                </h1>

                <ul className="list-disc pl-4">
                  <li>Account creation date</li>
                  <li>Last active timestamp</li>
                  <li>Verification status</li>
                  <li>User tier (free or pro)</li>
                  <li>Email notification preferences</li>
                  <li>Profile completion status</li>
                </ul>

                <h1 className="pt-2">
                  This data is collected automatically and is required for core platform functionality.
                </h1>
              </section>

              <section>
                <h1 className="text-xl font-medium py-4">1.4 Communication Data</h1>

                <h1 className="pb-2">
                  PartnerPair enables in-app messaging between users. We collect and store the following communication
                  data:
                </h1>

                <ul className="list-disc pl-4">
                  <li>Messages sent between users</li>
                  <li>Messages are stored securely using Firebase Firestore</li>
                  <li>Messages are retained unless deleted through chat deletion or account deletion</li>
                </ul>

                <h1 className="pt-2">
                  This data is used solely to provide messaging functionality and maintain platform integrity.
                </h1>
              </section>

              <section>
                <h1 className="text-xl font-medium py-4">1.5 Profile View Data</h1>

                <h1 className="pb-2">
                  When you view another user’s profile, we collect and display the following information:
                </h1>

                <ul className="list-disc pl-4">
                  <li>Your name</li>
                  <li>Your headline</li>
                  <li>Timestamp of the profile view</li>
                </ul>

                <h1 className="pt-2">
                  This data is visible to the viewed user and is not deleted when the viewer deletes their account.
                </h1>
              </section>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">2. How We Use Your Information</h1>

              <h1 className="pb-2">We use the information we collect for the following purposes:</h1>

              <ul className="list-disc pl-4">
                <li>Create and manage user accounts</li>
                <li>Enable co-founder matching</li>
                <li>Operate in-app messaging</li>
                <li>Display profile views to users</li>
                <li>Send platform-related emails and notifications (enabled by default)</li>
                <li>Process payments and subscriptions</li>
                <li>Improve platform functionality and security</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h1 className="pt-2">
                We only use your information as necessary to provide and improve the PartnerPair platform.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">3. Matching Algorithm</h1>

              <h1 className="pb-2">
                PartnerPair uses an automated matching algorithm to suggest potential co-founders.
              </h1>

              <ul className="list-disc pl-4">
                <li>Matching is based on a Jaccard similarity method</li>
                <li>No artificial intelligence or machine learning is used</li>
                <li>Matching is based solely on user-provided data and preferences</li>
              </ul>

              <h1 className="pt-2">
                The algorithm is designed to provide transparent, deterministic matching results.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">4. Payments</h1>

              <h1 className="pb-2">PartnerPair operates on a freemium subscription model.</h1>

              <ul className="list-disc pl-4">
                <li>Payments are processed securely via PayPal</li>
                <li>We do not store credit card or payment details</li>
                <li>PayPal’s privacy policy applies to all payment transactions</li>
              </ul>

              <h1 className="pt-2">PartnerPair does not have access to or retain sensitive payment information.</h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">5. Cookies &amp; Local Storage</h1>

              <h1 className="pb-2">PartnerPair does not use cookies for tracking or advertising purposes.</h1>

              <ul className="list-disc pl-4">
                <li>Theme and UI preferences</li>
              </ul>

              <h1 className="pt-2">
                We use local storage solely for essential user interface functionality. No tracking, advertising, or
                marketing cookies are used.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">6. Third-Party Services</h1>

              <h1 className="pb-2">
                We rely on trusted third-party infrastructure providers to operate the platform. These providers process
                data only as necessary to deliver their services and are bound by their own privacy and security
                obligations.
              </h1>

              <ul className="list-disc pl-4">
                <li>Firebase Authentication – user authentication</li>
                <li>Firebase Firestore – database storage</li>
                <li>Firebase Storage – profile images</li>
                <li>Vercel – hosting</li>
                <li>Cloudflare – security and performance</li>
                <li>Resend – email delivery</li>
                <li>PayPal – payment processing</li>
              </ul>

              <h1 className="pt-2">
                These third-party services are essential for platform functionality and are carefully selected for
                reliability and security.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">7. Data Storage &amp; Security</h1>

              <h1 className="pb-2">PartnerPair takes data security seriously and implements the following measures:</h1>

              <ul className="list-disc pl-4">
                <li>Data is stored securely using Firebase infrastructure</li>
                <li>Data is encrypted in transit using HTTPS</li>
                <li>Reasonable technical and organizational measures are implemented to protect user data</li>
                <li>While no system is 100% secure, we continuously improve our safeguards</li>
              </ul>

              <h1 className="pt-2">
                These measures help protect your information from unauthorized access, alteration, or disclosure.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">8. Admin Access</h1>

              <h1 className="pb-2">
                The platform is administered by a single administrator (the owner). The administrator has technical
                access to stored data strictly for maintenance, security, and legal purposes.
              </h1>

              <ul className="list-disc pl-4">
                <li>Access includes technical access to messages and other stored data</li>
                <li>Messages are not accessed, monitored, or used for any other purpose</li>
              </ul>

              <h1 className="pt-2">
                Administrator access exists solely to ensure platform functionality, safety, and compliance.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">9. Data Retention</h1>

              <h1 className="pb-2">
                Your data is retained for as long as your account is active. When you delete your account, all personal
                data is permanently deleted except:
              </h1>

              <ul className="list-disc pl-4">
                <li>Profile view records you created on other users’ profiles</li>
              </ul>

              <h1 className="pt-2">
                This exception is necessary to preserve the integrity of other users’ activity histories.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">10. Your Rights</h1>

              <h1 className="pb-2">You have the right to manage your personal data, including:</h1>

              <ul className="list-disc pl-4">
                <li>Access your personal data</li>
                <li>Edit or update your information</li>
                <li>Delete your account and associated data</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent for email notifications</li>
              </ul>

              <h1 className="pt-2">
                Specific requests regarding your data can be made by contacting us at: hasan04.asm@gmail.com.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">11. International Users</h1>

              <h1 className="pb-2">
                PartnerPair is available worldwide. By using the platform, you acknowledge that your data may be
                processed in jurisdictions outside your country of residence. We aim to comply with applicable data
                protection laws, including:
              </h1>

              <ul className="list-disc pl-4">
                <li>GDPR (European Union)</li>
                <li>UK GDPR</li>
                <li>CCPA/CPRA (California)</li>
                <li>Other applicable international privacy laws</li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">12. Children’s Privacy</h1>

              <h1 className="">
                PartnerPair is not intended for users under the age of 16. We do not knowingly collect personal data
                from children below this age. Accounts found to violate this requirement will be removed.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">13. Changes to This Policy</h1>

              <h1 className="">
                We may update this Privacy Policy from time to time. When changes are made, the updated version will be
                posted on this page with a revised “Last updated” date.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">14. Contact Information</h1>

              <h1 className="pb-2">For any questions, concerns, or privacy requests, contact:</h1>

              <ul className="list-disc pl-4">
                <li>{"Email: " + FOOTER.PERSONAL_MAIL_ADDRESS}</li>
                <li>Designation: Developer / Creator / Owner of PartnerPair.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="bg-base-300 py-16"></div>

      <Footer />
    </>
  );
};
