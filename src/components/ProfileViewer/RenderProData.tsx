import type { DisplayableUserPro } from "../../../shared/types/DisplayableUserPro";
import { CircleStar, Clock, ExternalLink, MapPin, Phone, Zap } from "lucide-react";
import { GenericChipCollection } from "./GenericChipCollection";
import { GenericChip } from "./GenericChip";
import { AddContact } from "../user/AddContact";

export const RenderProData = ({
  visitedUserData,
  visitedUserId,
}: {
  visitedUserData: DisplayableUserPro;
  visitedUserId: string;
}) => {
  return (
    <div className="w-full max-w-220 border-1 border-accent rounded-3xl p-8">
      <div className="flex gap-4">
        <div className="min-w-36">
          <img src={visitedUserData.basicInfo.profileImageUrl} className="w-36 h-36 rounded-full" />
        </div>

        <div className="w-full">
          <div className="flex justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-medium">
                      {visitedUserData.basicInfo.firstName + " " + visitedUserData.basicInfo.lastName}
                    </h1>
                    {visitedUserData.basicInfo.tier === "Pro" ? (
                      <div className="tooltip tooltip-top tooltip-primary" data-tip={"Pro user"}>
                        <CircleStar className="text-primary" size={20} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="">
                    <p className="text-accent">{visitedUserData.professionalInfo.headline}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <AddContact contactId={visitedUserId} />
                  <button className="btn btn-primary">Message</button>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  {visitedUserData.basicInfo.location && (
                    <div className="flex items-center gap-2">
                      <div className="tooltip tooltip-top" data-tip="Location">
                        <MapPin size={20} className="text-accent cursor-pointer" />
                      </div>
                      <span>{visitedUserData.basicInfo.location}</span>
                    </div>
                  )}

                  {visitedUserData.professionalInfo.commitmentLevel && (
                    <div className="flex items-center gap-2">
                      <div className="tooltip tooltip-top" data-tip="Commitment Level">
                        <Clock size={20} className="text-accent cursor-pointer" />
                      </div>
                      <span>{visitedUserData.professionalInfo.commitmentLevel}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {visitedUserData.basicInfo.phone && (
                    <div className="flex items-center gap-2">
                      <div className="tooltip tooltip-top" data-tip="Phone">
                        <Phone size={20} className="text-accent cursor-pointer" />
                      </div>
                      <span>{visitedUserData.basicInfo.phone}</span>
                    </div>
                  )}

                  {visitedUserData.professionalInfo.availability && (
                    <div className="flex items-center gap-2">
                      <div className="tooltip tooltip-top" data-tip="Availability">
                        <Zap size={20} className="text-accent cursor-pointer" />
                      </div>
                      <span>{visitedUserData.professionalInfo.availability}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-medium">About Me</h1>
        <p className={`mt-2 ${visitedUserData.professionalInfo.bio === "" ? "text-center text-accent" : ""}`}>
          {visitedUserData.professionalInfo.bio ||
            `${visitedUserData.basicInfo.firstName + " has not added a bio yet."}`}
        </p>
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-medium">Roles I Play</h1>
        <div className="mt-2">
          <GenericChipCollection
            listItems={visitedUserData.professionalInfo.roles}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any roles yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-medium">My Skills</h1>
        <div className="mt-2">
          <GenericChipCollection
            listItems={visitedUserData.professionalInfo.skills}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any skills yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="">
          {visitedUserData.professionalInfo.wantsToCofound ? (
            <h1 className="text-lg font-medium">Startup</h1>
          ) : (
            <h1 className="text-lg font-medium">My Startup</h1>
          )}
        </div>

        {visitedUserData.professionalInfo.wantsToCofound ? (
          <div className="mt-2 flex justify-between">
            <p>I want to join someone else's startup as a co-founder</p>
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              checked={visitedUserData.professionalInfo.wantsToCofound}
            />
          </div>
        ) : (
          <div className="mt-2">
            {visitedUserData.professionalInfo.startupDescription.length === 0 ? (
              <p className="text-accent">
                {visitedUserData.basicInfo.firstName + " is still working on this section."}
              </p>
            ) : (
              <p>{visitedUserData.professionalInfo.startupDescription}</p>
            )}
            <div className="mt-2">
              {visitedUserData.professionalInfo.startupStage ? (
                <GenericChip chipText={visitedUserData.professionalInfo.startupStage} />
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>

      {visitedUserData.professionalInfo.wantsToCofound ? (
        <div className="mt-4">
          <h1 className="text-lg font-medium">My Preferred Startup Stages</h1>
          <div className="mt-2">
            <GenericChipCollection
              listItems={visitedUserData.matchingPreferences.preferredCompanyStage as string[]}
              fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred stages yet."}
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
            listItems={visitedUserData.matchingPreferences.lookingForRoles}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred roles yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-medium">Skills I am Looking For</h1>
        <div className="mt-2">
          <GenericChipCollection
            listItems={visitedUserData.matchingPreferences.lookingForSkills}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred skills yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-lg font-medium">My Socials</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.keys(visitedUserData.socialLinks).map((linkItem) => {
            return (
              <GenericChip
                chipText={linkItem[0].toUpperCase() + linkItem.slice(1)}
                onClick={() => {
                  const url = visitedUserData.socialLinks[linkItem as keyof typeof visitedUserData.socialLinks];
                  if (url) window.open(url, "_blank");
                }}
              >
                <ExternalLink size={20} />
              </GenericChip>
            );
          })}
        </div>
      </div>
    </div>
  );
};
