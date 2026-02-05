import type { DisplayableUserPro } from "../../../shared/types/DisplayableUserPro";
import { Clock, ExternalLink, MapPin, Phone, Zap } from "lucide-react";
import { GenericChipCollection } from "./GenericChipCollection";
import { GenericChip } from "./GenericChip";
import { AddContact } from "../user/AddContact";
import { ProBadge } from "../user/ProBadge";
import { MessageUser } from "../messaging/MessageUser";

export const RenderProData = ({
  visitedUserData,
  visitedUserId,
}: {
  visitedUserData: DisplayableUserPro;
  visitedUserId: string;
}) => {
  return (
    <div className="w-full max-w-220 border border-base-100 rounded-3xl p-8">
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
                    {visitedUserData.basicInfo.tier === "Pro" ? <ProBadge /> : ""}
                  </div>
                  <div className="">
                    <p className="text-accent">{visitedUserData.professionalInfo.headline ?? "---"}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <AddContact contactId={visitedUserId} />
                  <MessageUser otherParticipantId={visitedUserId} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 w-fit">
                {visitedUserData.basicInfo.location && (
                  <div className="flex items-center gap-2">
                    <div className="tooltip tooltip-top" data-tip="Location">
                      <MapPin size={20} className="text-accent cursor-pointer" />
                    </div>
                    <span className="text-neutral/80">{visitedUserData.basicInfo.location}</span>
                  </div>
                )}

                {visitedUserData.professionalInfo.commitmentLevel && (
                  <div className="flex items-center gap-2">
                    <div className="tooltip tooltip-top" data-tip="Commitment Level">
                      <Clock size={20} className="text-accent cursor-pointer" />
                    </div>
                    <span className="text-neutral/80">{visitedUserData.professionalInfo.commitmentLevel}</span>
                  </div>
                )}

                {visitedUserData.basicInfo.phone && (
                  <div className="flex items-center gap-2">
                    <div className="tooltip tooltip-top" data-tip="Phone">
                      <Phone size={20} className="text-accent cursor-pointer" />
                    </div>
                    <span className="text-neutral/80">{visitedUserData.basicInfo.phone}</span>
                  </div>
                )}

                {visitedUserData.professionalInfo.availability && (
                  <div className="flex items-center gap-2">
                    <div className="tooltip tooltip-top" data-tip="Availability">
                      <Zap size={20} className="text-accent cursor-pointer" />
                    </div>
                    <span className="text-neutral/80">{visitedUserData.professionalInfo.availability}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">About Me</p>
        <p
          className={`mt-2 ${visitedUserData.professionalInfo.bio === "" ? "text-center text-accent" : "text-neutral/80"}`}
        >
          {visitedUserData.professionalInfo.bio ||
            `${visitedUserData.basicInfo.firstName + " has not added a bio yet."}`}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">Roles I Play</p>
        <div className="mt-2">
          <GenericChipCollection
            listItems={visitedUserData.professionalInfo.roles}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any roles yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">My Skills</p>
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
            <p className="text-accent uppercase font-semibold tracking-wide">Startup</p>
          ) : (
            <p className="text-accent uppercase font-semibold tracking-wide">My Startup</p>
          )}
        </div>

        {visitedUserData.professionalInfo.wantsToCofound ? (
          <div className="mt-2 flex justify-between">
            <p className="text-neutral/80">I want to join someone else's startup as a cofounder</p>
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              checked={visitedUserData.professionalInfo.wantsToCofound}
            />
          </div>
        ) : (
          <div className="mt-2">
            {visitedUserData.professionalInfo.startupDescription.length === 0 ? (
              <p className="text-accent text-center">
                {visitedUserData.basicInfo.firstName + " is still working on this section."}
              </p>
            ) : (
              <p className="text-neutral/80">{visitedUserData.professionalInfo.startupDescription}</p>
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
          <p className="text-accent uppercase font-semibold tracking-wide">My Preferred Startup Stages</p>
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
        <p className="text-accent uppercase font-semibold tracking-wide">Roles I am Looking For</p>
        <div className="mt-2">
          <GenericChipCollection
            listItems={visitedUserData.matchingPreferences.lookingForRoles}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred roles yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">Skills I am Looking For</p>
        <div className="mt-2">
          <GenericChipCollection
            listItems={visitedUserData.matchingPreferences.lookingForSkills}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred skills yet."}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">Preferred Cofounder Commitment Level</p>
        <div className="mt-2">
          <GenericChip
            chipText={visitedUserData.matchingPreferences.commitmentLevel!}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred commitment level."}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">Preferred Cofounder Availability</p>
        <div className="mt-2">
          <GenericChip
            chipText={visitedUserData.matchingPreferences.availability!}
            fallbackText={visitedUserData.basicInfo.firstName + " has not added any preferred availability."}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-accent uppercase font-semibold tracking-wide">My Socials</p>
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
