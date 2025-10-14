import { useParams } from "react-router-dom";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";
import { useInitializeUser } from "../hooks/useInitializeUser";
import Loader from "../components/Loader";
import { getProfileData } from "../utils/getProfileData";
import { CircleStar, Clock, MapPin, Phone, Zap } from "lucide-react";
import { GenericChipCollection } from "../components/ProfileViewer/GenericChipCollection";

export const ViewUserProfile = () => {
  useTheme();

  const { id } = useParams(); // Use later while actually making the API call.
  const { loading } = useInitializeUser();
  const user = getProfileData("Pro"); // Mock data from stub

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-col items-center py-10">
            <div className="w-full max-w-200 border-1 border-accent rounded-3xl p-8">
              <div className="flex gap-4">
                <div className="min-w-36">
                  <img src={user.basicInfo.profileImageUrl} className="w-36 h-36 rounded-full" />
                </div>

                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="">
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-medium">
                          {user.basicInfo.firstName + " " + user.basicInfo.lastName}
                        </h1>
                        {user.basicInfo.tier === "Pro" ? (
                          <div className="tooltip tooltip-top tooltip-primary" data-tip={"Pro user"}>
                            <CircleStar className="text-primary" size={20} />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="">
                        <p className="text-accent">{user.professionalInfo.headline}</p>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                          <p className="flex gap-2">
                            <MapPin size={20} className="text-accent" /> {user.basicInfo.location}
                          </p>
                          <p className="flex gap-2">
                            <Clock size={20} className="text-accent" /> {user.professionalInfo.commitmentLevel}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="flex gap-2">
                            <Phone size={20} className="text-accent" /> {user.basicInfo.phone}
                          </p>
                          <p className="flex gap-2">
                            <Zap size={20} className="text-accent" /> {user.professionalInfo.availability}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <button className={`btn ${!user.basicInfo.connectedToCurrentUser ? "btn-primary" : "btn-error"}`}>
                        {!user.basicInfo.connectedToCurrentUser ? "Connect" : "Disconnect"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-lg font-medium">About</h1>
                <p className="mt-2">{user.professionalInfo.bio}</p>
              </div>
              <div className="mt-4">
                <h1 className="text-lg font-medium">Skills</h1>
                <div className="mt-2">
                  <GenericChipCollection
                    listItems={user.professionalInfo.skills}
                    fallbackText={user.basicInfo.firstName + " has not added any skills yet."}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">Roles</h1>
                <div className="mt-2">
                  <GenericChipCollection
                    listItems={user.professionalInfo.roles}
                    fallbackText={user.basicInfo.firstName + " has not added any roles yet."}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">Startup</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
