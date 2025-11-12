import { USER_CONTACTS } from "../../shared/constants/USER_CONTACTS";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";

export const UserContacts = () => {
  const { user, loading } = useInitializeUser();

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <MainNavbar />
      </div>

      <div className="py-10 flex items-center justify-center">
        <div className="w-full max-w-200">
          <h1 className="font-bold text-3xl">Contacts</h1>
          <p className="text-accent">{USER_CONTACTS.SUBTITLE_TEXT}</p>
        </div>
      </div>
    </div>
  );
};
