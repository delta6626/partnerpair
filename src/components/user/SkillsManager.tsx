import { MODALS } from "../../constants/MODALS";
import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { AddSkillModal } from "../modals/AddSkillModal";
import { SkillHolder } from "./SkillHolder";

export const SkillsManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser } = useTempUserStore();

  if (!tempUser) {
    return null;
  }

  const skills = forCurrentUser
    ? tempUser.professionalInfo.skills ?? []
    : tempUser.matchingPreferences.lookingForSkills ?? [];

  const handleAddSkillButtonClick = () => {
    const addSkillModal = forCurrentUser
      ? (document.getElementById(MODALS.ADD_SKILL_MODAL.ID_CURRENT) as HTMLDialogElement)
      : (document.getElementById(MODALS.ADD_SKILL_MODAL.ID_MATCHING) as HTMLDialogElement);
    addSkillModal.showModal();
  };

  return (
    <>
      <AddSkillModal forCurrentUser={forCurrentUser} />

      <div className="mt-4 flex items-center justify-between">
        <p>{forCurrentUser ? "What skills do you have?" : "What skills are you looking for in a cofounder?"}</p>
        <button
          className="btn btn-primary"
          disabled={skills.length === SETTINGS.MAX_SKILL_COUNT}
          onClick={handleAddSkillButtonClick}
        >
          {SETTINGS.ADD_SKILL_BUTTON_TEXT}
        </button>
      </div>

      <div className="mt-2">
        <div className="w-full flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill) => <SkillHolder key={skill} skillName={skill} forCurrentUser={forCurrentUser} />)
          ) : (
            <p className="w-full text-center text-accent">{SETTINGS.NO_SKILLS_PARAGRAPH_TEXT}</p>
          )}
        </div>
      </div>
    </>
  );
};
