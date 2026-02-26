import { FOOTER } from "../../shared/constants/FOOTER";
import { Footer } from "../components/navigation/Footer";
import { Navbar } from "../components/navigation/Navbar";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useTheme } from "../hooks/useTheme";

export const TermsOfService = () => {
  useTheme();
  useScrollToTop();

  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-col font-inter bg-base-300 paddingContainer">
        <div className="py-4">
          <Navbar />
        </div>

        <div className="flex flex-col items-center">
          <div className="py-8 w-full max-w-200 mt-4">
            <h1 className="text-3xl font-semibold">Terms of Service</h1>
            <p className="text-accent">Last Updated: January 18, 2026</p>

            <section className="mt-8">
              Welcome to PartnerPair (“PartnerPair”, “we”, “us”, or “our”). These Terms of Service (“Terms”) govern your
              access to and use of PartnerPair, a web-based co-founder matching platform owned and operated by an
              individual based in the United Arab Emirates. By creating an account or using PartnerPair, you agree to be
              bound by these Terms. If you do not agree to these Terms, do not use PartnerPair.
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">1. Eligibility</h1>

              <ul className="list-disc pl-4">
                <li>You must be at least 16 years old to use PartnerPair.</li>
                <li>
                  By using the platform, you represent and warrant that you meet the age requirement and have the legal
                  capacity to enter into these Terms.
                </li>
                <li>
                  Users are responsible for complying with all local laws when accessing PartnerPair internationally.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">2. Account Responsibility</h1>

              <ul className="list-disc pl-4">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You are responsible for all activity that occurs under your account.</li>
                <li>Do not share your account or use another person’s account without authorization.</li>
                <li>Notify PartnerPair immediately if you suspect any unauthorized access to your account.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">3. User-Generated Content</h1>

              <ul className="list-disc pl-4">
                <li>Your profile information, bio, skills, startup ideas, and messages are user-generated content.</li>
                <li>You are solely responsible for all content you provide or share.</li>
                <li>
                  You agree not to post content that is unlawful, abusive, harassing, infringing, defamatory, obscene,
                  or otherwise harmful.
                </li>
                <li>
                  Messages sent through PartnerPair are private, but may be reviewed by the administrator if reported.
                </li>
                <li>
                  PartnerPair provides tools to report abusive messages or content. Reported accounts may be reviewed
                  and, at the administrator’s discretion, suspended or terminated.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">4. Platform Use & Monetization</h1>

              <ul className="list-disc pl-4">
                <li>PartnerPair is provided for the purpose of connecting potential co-founders.</li>
                <li>
                  The platform relies on monetization of user-generated data for operational sustainability, including
                  aggregated and derived use of profile and activity data.
                </li>
                <li>
                  By using the platform, you acknowledge and agree that your user-generated data contributes to the
                  platform’s revenue generation.
                </li>
                <li>
                  PartnerPair is provided “as-is”, and we do not guarantee co-founder matches or any outcomes from using
                  the platform.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">5. Paid Subscriptions (Pro Plan)</h1>

              <ul className="list-disc pl-4">
                <li>PartnerPair operates on a freemium model with optional subscription-based Pro features.</li>
                <li>No refunds are provided for Pro subscriptions.</li>
                <li>Subscriptions are automatically renewed unless canceled by you.</li>
                <li>
                  If your account is terminated for violations of these Terms, your subscription will be automatically
                  canceled and no refund will be issued.
                </li>
                <li>
                  You may cancel your subscription at any time in accordance with the platform’s cancellation
                  procedures.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">6. Content Moderation & Account Termination</h1>

              <ul className="list-disc pl-4">
                <li>
                  PartnerPair reserves the right to suspend, remove, or restrict content deemed abusive, harmful, or
                  violating these Terms.
                </li>
                <li>
                  Accounts may be terminated at the administrator’s discretion for policy violations, inactivity, or
                  misuse of the platform.
                </li>
                <li>Termination does not entitle users to any refunds or compensation.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">7. Intellectual Property</h1>

              <ul className="list-disc pl-4">
                <li>
                  PartnerPair’s software is source-available, not open-source. Users may view, copy, modify, and
                  distribute the source code solely for personal, educational, or other non-commercial purposes.
                </li>
                <li>
                  All branding, logos, trademarks, and platform design elements are and remain the exclusive property of
                  the administrator.
                </li>
                <li>
                  Any commercial use, monetization, or profit derived from PartnerPair’s software, branding, or related
                  assets is strictly prohibited without prior explicit written permission from the administrator.
                </li>
                <li>
                  Access to and use of the hosted PartnerPair platform is provided under a limited, non-exclusive,
                  revocable license, solely for its intended purpose and subject to these terms.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">8. Disclaimer of Warranties & Limitation of Liability</h1>

              <ul className="list-disc pl-4">
                <li>PartnerPair is provided “as-is” and without warranties of any kind, whether express or implied.</li>
                <li>We do not guarantee the accuracy, reliability, or availability of the platform.</li>
                <li>
                  PartnerPair is not responsible for the outcomes of co-founder matches or interactions between users.
                </li>
                <li>
                  To the maximum extent permitted by law, PartnerPair and its administrator shall not be liable for any
                  damages arising from your use of the platform.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">9. Governing Law & Dispute Resolution</h1>

              <ul className="list-disc pl-4">
                <li>These Terms are governed by the laws of the United Arab Emirates.</li>
                <li>
                  Any disputes arising out of or related to these Terms shall be resolved in UAE courts unless otherwise
                  agreed in writing.
                </li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">10. Changes to Terms</h1>

              <ul className="list-disc pl-4">
                <li>PartnerPair may update these Terms from time to time.</li>
                <li>Updated Terms will be posted on this page with a revised “Last updated” date.</li>
                <li>Continued use of the platform constitutes acceptance of the revised Terms.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">11. Changes to these Terms</h1>

              <h1 className="">
                We may update these terms from time to time. When changes are made, the updated version will be posted
                on this page with a revised “Last updated” date.
              </h1>
            </section>

            <section className="mt-8">
              <h1 className="text-2xl font-semibold pb-4">12. Contact</h1>

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
