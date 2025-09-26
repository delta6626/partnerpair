import { MODALS } from "../../constants/MODALS";
import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { AddSkillModal } from "../modals/AddSkillModal";
import { SkillHolder } from "./SkillHolder";

export const SkillsManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser } = useTempUserStore();

  if (!tempUser) {
    return;
  }

  const handleAddSkillButtonClick = () => {
    const addSkillModal = document.getElementById(MODALS.ADD_SKILL_MODAL.ID) as HTMLDialogElement | null;
    addSkillModal?.showModal();
  };

  return (
    <>
      <AddSkillModal forCurrentUser={forCurrentUser} />

      <div className="mt-4 flex items-center justify-between">
        <p className="">{forCurrentUser ? "Skills" : "Preferred Cofounder Skills"}</p>
        <button
          className="btn btn-primary"
          disabled={
            forCurrentUser
              ? tempUser.professionalInfo.skills?.length === SETTINGS.MAX_SKILL_COUNT
              : tempUser.matchingPreferences.lookingForSkills.length === SETTINGS.MAX_SKILL_COUNT
          }
          onClick={handleAddSkillButtonClick}
        >
          {SETTINGS.ADD_SKILL_BUTTON_TEXT}
        </button>
      </div>

      <div className="mt-2">
        <div className="w-full flex flex-wrap gap-2">
          {tempUser.professionalInfo.skills?.length !== 0 ? (
            tempUser.professionalInfo.skills?.map((skill) => {
              return <SkillHolder key={skill} skillName={skill} />;
            })
          ) : (
            <p className="w-full text-center text-accent">{SETTINGS.NO_SKILLS_PARAGRAPH_TEXT}</p>
          )}
        </div>
      </div>
    </>
  );
};
