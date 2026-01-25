import {
  ArrowRight,
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
  ClockIcon,
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
} from "lucide-react";
import { Navbar } from "../components/navigation/Navbar";
import { StepCard } from "../components/landing/StepCard";
import { Footer } from "../components/navigation/Footer";
import { IconText } from "../components/landing/IconText";
import { FeatureCard } from "../components/landing/FeatureCard";

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

            <button className="btn">Explore features</button>
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

      <section className="py-16 flex flex-col items-center gap-16 paddingContainer">
        <div className="w-full text-center">
          <h1 className="text-4xl font-medium">How it Works</h1>
          <h1 className="text-lg text-accent">Three steps to find your co-founder</h1>
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

      <section className="py-16 flex items-center justify-between gap-16 paddingContainer">
        <div className="max-w-lg flex flex-col gap-8">
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

        {/* Insert image later */}
        <div></div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-row-reverse items-center justify-between gap-16 paddingContainer">
        <div className="max-w-lg flex flex-col gap-8">
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

        {/* Insert image later */}
        <div></div>
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

        <div className="grid grid-cols-3 place-items-center gap-8">
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

      <section className="py-16 flex items-center justify-between gap-16 paddingContainer">
        <div className="max-w-lg flex flex-col gap-8">
          <IconText icon={MessageSquare} text={"Real-Time Messaging"} topTag={true} />

          <h1 className="text-4xl font-medium">Start Conversations Directly</h1>

          <h1 className="text-accent text-lg">
            Direct messaging with potential co-founders. Smart icebreakers help you start conversations, with full chat
            history and search built in.
          </h1>

          <div className="flex flex-col gap-2">
            <IconText icon={MessageCircle} text={"Instant chat with no connection requests needed"} />
            <IconText icon={Zap} text={"Pre-written icebreaker templates to start conversations"} />
            <IconText icon={Search} text={"Search through your message history"} />
          </div>
        </div>

        {/* Insert image later */}
        <div></div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-row-reverse items-center justify-between gap-16 paddingContainer">
        <div className="max-w-lg flex flex-col gap-8">
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

        {/* Insert image later */}
        <div></div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex items-center justify-between gap-16 paddingContainer">
        <div className="max-w-lg flex flex-col gap-8">
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

        {/* Insert image later */}
        <div></div>
      </section>

      <div className="border-b border-base-100"></div>

      <section className="py-16 flex flex-col gap-16 paddingContainer">
        <div className="w-full flex items-center flex-col gap-8">
          <IconText icon={Shield} text={"Safety and Trust"} topTag={true} />

          <h1 className="text-4xl font-medium">A Safe Place to Find Co-founders</h1>

          <h1 className="text-accent text-center text-lg max-w-lg">
            Verify your email to protect the community. Report misuse anytime. Our moderation team reviews every report
            and takes action.
          </h1>
        </div>

        <div className="grid grid-cols-4 place-items-center gap-8">
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

      <Footer />
    </div>
  );
};
