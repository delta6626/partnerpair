import { useParams } from "react-router-dom";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { Loader } from "../components/Loader";
import { getProfileData } from "../../shared/utils/getProfileData";
import { CircleStar, Clock, ExternalLink, MapPin, Phone, Zap } from "lucide-react";
import { GenericChipCollection } from "../components/ProfileViewer/GenericChipCollection";
import { GenericChip } from "../components/ProfileViewer/GenericChip";
import { functions } from "../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import type { DisplayableUserPro } from "../../shared/types/DisplayableUserPro";
import type { DisplayableUserBasic } from "../../shared/types/DisplayableUserBasic";
import { RenderProData } from "../components/ProfileViewer/RenderProData";
import { RenderBasicData } from "../components/ProfileViewer/RenderBasicData";

export const ViewUserProfile = () => {
  useTheme();

  const { id } = useParams();
  const { loading } = useInitializeUser();
  const getVisitedUserProfileData = httpsCallable(functions, "getVisitedUserProfileData");

  const [visitedUser, setVisitedUser] = useState<DisplayableUserPro | DisplayableUserBasic>();
  const [visitedUserDataLoaded, setVisitedUserDataLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading || !id) return;

    const fetchVisitedUserProfile = async () => {
      try {
        setError(null); // clear any previous error
        setVisitedUserDataLoaded(false);

        const response = await getVisitedUserProfileData({ visitedUserId: id });
        const data = response.data as DisplayableUserPro | DisplayableUserBasic;

        setVisitedUser(data);
      } catch (error: any) {
        // Extract Firebase HttpsError message
        const message = error?.message || error?.code || "An unknown error occurred while fetching the user profile.";
        setError(message);
      } finally {
        setVisitedUserDataLoaded(true);
      }
    };

    fetchVisitedUserProfile();
  }, [id, loading]);

  return (
    <div className="">
      {loading || !visitedUserDataLoaded ? (
        <div className="w-full h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-col items-center py-10">
            {error ? (
              <div className="">An error occurred: {error}</div>
            ) : visitedUser ? (
              "socialLinks" in visitedUser ? (
                <RenderProData visitedUserData={visitedUser} />
              ) : (
                <RenderBasicData visitedUserData={visitedUser} />
              )
            ) : (
              ""
            )}
            {/* <div className="w-full max-w-200 border-1 border-accent rounded-3xl p-8">
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
                      <button className={`btn ${!user.basicInfo.addedToContactList ? "btn-primary" : "btn-error"}`}>
                        {!user.basicInfo.addedToContactList ? "Add Contact" : "Remove Contact"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">About Me</h1>
                <p className="mt-2">{user.professionalInfo.bio}</p>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">Roles I Play</h1>
                <div className="mt-2">
                  <GenericChipCollection
                    listItems={user.professionalInfo.roles}
                    fallbackText={user.basicInfo.firstName + " has not added any roles yet."}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">My Skills</h1>
                <div className="mt-2">
                  <GenericChipCollection
                    listItems={user.professionalInfo.skills}
                    fallbackText={user.basicInfo.firstName + " has not added any skills yet."}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="">
                  {user.professionalInfo.wantsToCofound ? (
                    <h1 className="text-lg font-medium">Startup</h1>
                  ) : (
                    <h1 className="text-lg font-medium">My Startup</h1>
                  )}
                </div>

                {user.professionalInfo.wantsToCofound ? (
                  <div className="mt-2 flex justify-between">
                    <p>I want to join someone else's startup as a co-founder</p>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={user.professionalInfo.wantsToCofound}
                    />
                  </div>
                ) : (
                  <div className="mt-2">
                    {user.professionalInfo.startupDescription.length === 0 ? (
                      <p className="text-accent">{user.basicInfo.firstName + " is still working on this section."}</p>
                    ) : (
                      <p>{user.professionalInfo.startupDescription}</p>
                    )}
                    <div className="mt-2">
                      {user.professionalInfo.startupStage ? (
                        <GenericChip chipText={user.professionalInfo.startupStage} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
              </div>

              {user.professionalInfo.wantsToCofound ? (
                <div className="mt-4">
                  <h1 className="text-lg font-medium">My Preferred Startup Stages</h1>
                  <div className="mt-2">
                    <GenericChipCollection
                      listItems={user.matchingPreferences.preferredCompanyStage}
                      fallbackText={user.basicInfo.firstName + " has not added any preferred stages yet."}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="mt-4">
                <h1 className="text-lg font-medium">Roles I am Looking For</h1>
                <div className="mt-2">
                  <GenericChipCollection
                    listItems={user.matchingPreferences.lookingForRoles}
                    fallbackText={user.basicInfo.firstName + " has not added any preferred roles yet."}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">Skills I am Looking For</h1>
                <div className="mt-2">
                  <GenericChipCollection
                    listItems={user.matchingPreferences.lookingForSkills}
                    fallbackText={user.basicInfo.firstName + " has not added any preferred skills yet."}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-lg font-medium">My Socials</h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.keys(user.socialLinks).map((linkItem) => {
                    return (
                      <GenericChip
                        chipText={linkItem[0].toUpperCase() + linkItem.slice(1)}
                        onClick={() => {
                          const url = user.socialLinks[linkItem as keyof typeof user.socialLinks];
                          if (url) window.open(url, "_blank");
                        }}
                      >
                        <ExternalLink size={20} />
                      </GenericChip>
                    );
                  })}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
