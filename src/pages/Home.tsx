import {
  Briefcase,
  Clock,
  Filter,
  MapPin,
  Stars,
  Target,
  Users2,
  Zap,
  UserCheck,
  Sparkles,
  TrendingUp,
  BookOpen,
  Link,
  MessageSquare,
  MessageCircle,
  Search,
  BarChart2,
  Eye,
  Bookmark,
  Shield,
  CircleCheck,
  Flag,
  Ban,
  Crown,
  Hourglass,
  MessagesSquare,
  HelpCircle,
  Route,
  UserRoundPlus,
  UserRoundMinus,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "../components/navigation/Navbar";
import { StepCard } from "../components/landing/StepCard";
import { Footer } from "../components/navigation/Footer";
import { IconText } from "../components/landing/IconText";
import { FeatureCard } from "../components/landing/FeatureCard";
import { PricingCard } from "../components/landing/PricingCard";
import { HOME } from "../../shared/constants/HOME";
import { GetStartedButton } from "../components/landing/GetStartedButton";
import { Collapse } from "../components/landing/Collapse";
import { useVerificationCheck } from "../hooks/useVerificationCheck";
import { DemoUserCollection } from "../components/landing/DemoUserCollection";
import { DemoUser } from "../components/landing/DemoUser";
import { MockBrowseUI } from "../components/landing/MockBrowseUI";
import { MockChatUI } from "../components/landing/MockChatUI";

export const Home = ({ redirect }: { redirect: boolean }) => {
  useVerificationCheck(redirect);

  return (
    <div className="w-full font-inter min-h-[100vh] bg-base-300">
      <div className="py-4 paddingContainer">
        <Navbar></Navbar>
      </div>

      <div className="border-b border-base-100"></div>

      <section className="py-16 paddingContainer flex flex-col gap-16 xl:flex-row xl:gap-0 items-center justify-between">
        <div className="flex flex-col items-center xl:items-start gap-8">
          <h1 className="text-6xl xl:text-5xl 2xl:text-6xl font-semibold text-center xl:text-left">
            Great Ideas Deserve<br></br>
            <span className="text-primary">Great Partners</span>
          </h1>

          <h1 className="text-lg text-accent max-w-lg text-center xl:text-left">
            Discover and connect with co-founders who complement your skills and vision. Whether you’re starting up or
            joining one, this is where teams begin.
          </h1>

          <div className="flex gap-4">
            <GetStartedButton route={`/signup`} variant="btn-primary" className="glowingItem" />
            <button className="btn">Explore features</button>
          </div>
        </div>

        <div className="w-full xl:w-fit">
          <iframe
            className="w-[100%] xl:w-lg 2xl:w-xl aspect-video rounded-3xl"
            src="https://www.youtube.com/embed/LDU_Txk06tM?si=XP-eVunKEDvgdu8x" // Change source later.
            title="PartnerPair Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col items-center gap-16 paddingContainer">
        <div className="max-w-lg flex items-center flex-col gap-8">
          <IconText icon={Route} text={"Quick and Simple"} topTag={true} />
          <h1 className="text-4xl font-medium">How it Works</h1>
          <h1 className="text-lg text-accent text-center">
            Three easy and simple steps to find the co-founder that best matches your need.
          </h1>
        </div>

        <div className="w-full flex items-center justify-between">
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

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col xl:flex-row items-center justify-between gap-16 paddingContainer">
        <div className="w-full xl:max-w-lg flex flex-col gap-8">
          <IconText icon={Stars} text={"Smart Matching"} topTag={true} />

          <h1 className="text-4xl font-medium">Data Driven Co-founder Matching</h1>

          <h1 className="text-accent text-lg">
            Our matching algorithm analyzes skills, roles, and preferences. You get suggested profiles tailored
            specifically to what you bring and what you need.
          </h1>

          <div className="flex flex-col gap-2">
            <IconText icon={Target} text={"Compatibility scoring based on complementary skills"} />
            <IconText icon={Zap} text={"Automatic suggestions on your dashboard"} />
            <IconText icon={Users2} text={"Dual-sided matching: find people looking for what you offer"} />
          </div>
        </div>

        <DemoUserCollection
          title={"Suggested for you"}
          sideElement={<button className="btn">Browse more</button>}
          demoUsers={[
            <DemoUser
              userName="Margaret Hamilton"
              userHeadline="Saved the moon landing with clean code"
              sideIcon={<UserRoundPlus className="text-neutral/80" size={20} />}
            />,
            <DemoUser
              userName="Tim Berners-Lee"
              userHeadline="You're welcome for the internet"
              sideIcon={<UserRoundPlus className="text-neutral/80" size={20} />}
            />,
            <DemoUser
              userName="Dennis Ritchie"
              userHeadline="Invented C so you could invent everything else"
              sideIcon={<UserRoundPlus className="text-neutral/80" size={20} />}
            />,
            <DemoUser
              userName="Guido van Rossum"
              userHeadline="Made Python so you don’t have to fight your code"
              sideIcon={<UserRoundPlus className="text-neutral/80" size={20} />}
            />,
          ]}
        />
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col xl:flex-row-reverse items-center justify-between gap-16 paddingContainer">
        <div className="w-full xl:max-w-lg flex flex-col gap-8">
          <IconText icon={Filter} text={"Advanced Search"} topTag={true} />

          <h1 className="text-4xl font-medium">Find Exactly Who You Need</h1>

          <h1 className="text-accent text-lg">
            Multi-filter search lets you narrow down candidates by skills, roles, commitment level, availability,
            startup stage, and location.
          </h1>

          <div className="flex flex-col gap-2">
            <IconText icon={Briefcase} text={"Filter by startup stages"} />
            <IconText icon={MapPin} text={"Search worldwide or by specific country/region"} />
            <IconText icon={Clock} text={"Filter by availability and time commitment"} />
          </div>
        </div>

        <MockBrowseUI />
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <IconText icon={UserCheck} text={"Comprehensive Profiles"} topTag={true} />

          <h1 className="text-4xl font-medium">Show Everything that Matters</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            Your profile displays your skills, roles, experience, availability, social links and more. A completion
            tracker guides you to build a complete profile.
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 place-items-center gap-8">
          <FeatureCard
            icon={Sparkles}
            title={"Skills Showcase"}
            description={"Display technical and non-technical skills with tags that help matches find you."}
          />

          <FeatureCard
            icon={Briefcase}
            title={"Roles & Experience"}
            description={"Highlight co-founder roles that you can fulfill as well as roles you are looking for."}
          />

          <FeatureCard
            icon={BookOpen}
            title={"Bio for a Story"}
            description={"Share your story in the Bio and highlight what makes you an ideal co-founder."}
          />

          <FeatureCard
            icon={Clock}
            title={"Availability & Commitment"}
            description={"Indicate the commitment and availability you offer, and what you expect from others."}
          />

          <FeatureCard
            icon={Link}
            title={"Social Proof"}
            description={"Link your LinkedIn, GitHub, Twitter, and personal website to showcase your credibility."}
          />

          <FeatureCard
            icon={TrendingUp}
            title={"Completion Tracking"}
            description={"A complete profile increases your visibility. The system guides you to achieve it."}
          />
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col xl:flex-row items-center justify-between gap-16 paddingContainer">
        <div className="w-full xl:max-w-lg flex flex-col gap-8">
          <IconText icon={MessageSquare} text={"Real-Time Messaging"} topTag={true} />

          <h1 className="text-4xl font-medium">Start Conversations Directly</h1>

          <h1 className="text-accent text-lg">
            Direct messaging with potential co-founders. Smart icebreakers help you start conversations, with full chat
            history and search built in.
          </h1>

          <div className="flex flex-col gap-2">
            <IconText icon={MessageCircle} text={"Instant chat with no connection requests needed"} />
            <IconText icon={Zap} text={"Pre-written icebreaker templates to start conversations"} />
            <IconText icon={Search} text={"Search through your chats"} />
          </div>
        </div>

        <MockChatUI />
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col xl:flex-row-reverse items-center justify-between gap-16 paddingContainer">
        <div className="w-full xl:max-w-lg flex flex-col gap-8">
          <IconText icon={BarChart2} text={"Profile Insights"} topTag={true} />

          <h1 className="text-4xl font-medium">Know Who is Viewing Your Profile</h1>

          <h1 className="text-accent text-lg">
            See exactly how many people viewed your profile and who they are. Filter by time period, track unique vs.
            repeat visitors, and monitor your profile performance over time.
          </h1>

          <div className="flex flex-col gap-2">
            <IconText icon={Eye} text={"View count with unique visitor tracking"} />
            <IconText icon={UserCheck} text={"See who specifically viewed your profile"} />
            <IconText icon={Clock} text={"Filter views by time period"} />
          </div>
        </div>

        <DemoUserCollection
          title={"Profile views"}
          sideElement={
            <div className="cursor-default px-4 py-2 text-sm border border-base-100 bg-base-200 text-accent rounded-3xl font-medium flex gap-4">
              Today
              <ChevronDown size={20} />
            </div>
          }
          demoUsers={[
            <DemoUser
              userName="Elon Musk"
              userHeadline="Viewed today at 12:43 PM"
              sideIcon={<MessageCircle className="text-neutral/80" size={20} />}
            />,
            <DemoUser
              userName="Bill Gates"
              userHeadline="Viewed today at 11:15 AM"
              sideIcon={<MessageCircle className="text-neutral/80" size={20} />}
            />,
            <DemoUser
              userName="Jeff Bezos"
              userHeadline="Viewed today at 10:52 AM"
              sideIcon={<MessageCircle className="text-neutral/80" size={20} />}
            />,
            <DemoUser
              userName="Mark Zuckerberg"
              userHeadline="Viewed today at 9:38 AM"
              sideIcon={<MessageCircle className="text-neutral/80" size={20} />}
            />,
          ]}
        />
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col xl:flex-row items-center justify-between gap-16 paddingContainer">
        <div className="w-full xl:max-w-lg flex flex-col gap-8">
          <IconText icon={Bookmark} text={"Save Contacts"} topTag={true} />

          <h1 className="text-4xl font-medium">Keep Track of Interesting Profiles</h1>

          <h1 className="text-accent text-lg">
            Save potential co-founders to review later. Organize and manage your list, search through saved contacts,
            and access them quickly from your dashboard.
          </h1>

          <div className="flex flex-col gap-2">
            <IconText icon={Bookmark} text={"Save profiles with one click"} />
            <IconText icon={Search} text={"Search and filter saved contacts"} />
            <IconText icon={Zap} text={"Quick access from your dashboard"} />
          </div>
        </div>

        <DemoUserCollection
          title={"Saved contacts"}
          sideElement={<p className="text-accent">4 saved</p>}
          demoUsers={[
            <DemoUser
              userName="Tanner Linsley"
              userHeadline="Creator of Tanstack"
              sideIcon={<UserRoundMinus className="text-error/60" size={20} />}
            />,
            <DemoUser
              userName="Jeff Delaney"
              userHeadline="Fireship creator, 100-second dev tutorials"
              sideIcon={<UserRoundMinus className="text-error/60" size={20} />}
            />,
            <DemoUser
              userName="Evan You"
              userHeadline="Created Vue.js, making reactive web development simple"
              sideIcon={<UserRoundMinus className="text-error/60" size={20} />}
            />,
            <DemoUser
              userName="shadcn"
              userHeadline="Building modern UI components and design systems"
              sideIcon={<UserRoundMinus className="text-error/60" size={20} />}
            />,
          ]}
        />
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <IconText icon={Shield} text={"Safety and Trust"} topTag={true} />

          <h1 className="text-center text-4xl font-medium">A Safe Place to Find Co-founders</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            Verify your email to protect the community. Report misuse anytime. Our moderation team reviews every report
            and takes action.
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 place-items-center gap-8">
          <FeatureCard
            icon={CircleCheck}
            title={"Verified Profiles"}
            description={"Email verification required for all users before accessing the platform."}
          />

          <FeatureCard
            icon={Flag}
            title={"Abuse Reporting"}
            description={"Report harrasment, spam or scams and keep the community safe."}
          />

          <FeatureCard
            icon={Shield}
            title={"Active Moderation"}
            description={"Every report is reviewed by our moderation team."}
          />

          <FeatureCard
            icon={Ban}
            title={"Account Suspension"}
            description={"Violators are suspended or terminated from the platform."}
          />
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <IconText icon={Crown} text={"Pricing"} topTag={true} />

          <h1 className="text-4xl font-medium">Choose Your Plan</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            Start free with everything you need. Go Pro to unlock premium features and exclusive benefits.
          </h1>
        </div>

        <div className="w-full flex flex-col-reverse lg:flex-row justify-center gap-4">
          <PricingCard
            tierName={"Basic"}
            tierSubtitle={"Free access to core features"}
            tierPrice={"0"}
            tierFeatures={HOME.BASIC_FEATURES}
            isRecommended={false}
            showGetStartedButton={true}
          />

          <PricingCard
            tierName={"Pro"}
            tierSubtitle={"Enhanced features for serious founders"}
            tierPrice={HOME.PRO_PRICE}
            tierFeatures={HOME.PRO_FEATURES}
            tierLink={"pro"}
            isRecommended={true}
            showGetStartedButton={true}
          />
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <IconText icon={Hourglass} text={"Coming soon"} topTag={true} />

          <h1 className="text-center text-4xl font-medium">On the Roadmap</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            New features are on the way, all built to help you connect more easily and grow over time.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
          <FeatureCard
            icon={MessagesSquare}
            title="Community Forums"
            description="Discussion threads for co-founding strategies, fundraising, and market trends. Connect with founders beyond direct messaging. Share resources and experiences."
          />

          <FeatureCard
            icon={BookOpen}
            title="Industry Blogs"
            description="Expert articles on co-founder relationships, fundraising, product-market fit, and scaling. Content from experienced founders and investors."
          />
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <IconText icon={HelpCircle} text={"FAQ"} topTag={true} />

          <h1 className="text-center text-4xl font-medium">Commonly Asked Questions</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            We’ve got answers to commonly asked questions to help you get started faster.
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {HOME.FAQ.map((item, id) => {
            return <Collapse key={id} question={item.question} answer={item.answer} />;
          })}
        </div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <h1 className="text-center text-4xl font-medium">Ready to Find Your Co-founder?</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            Create your profile and start connecting with founders who complement your skills.
          </h1>

          <GetStartedButton route={"/signup"} variant="btn-primary" className="glowingItem" />
        </div>
      </section>

      <Footer />
    </div>
  );
};
