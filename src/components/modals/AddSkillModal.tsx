import { useState, type ChangeEvent, type FormEvent } from "react";
import { MODAL_ACTIONS } from "../../constants/MODAL_ACTIONS";
import { MODALS } from "../../constants/MODALS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SETTINGS } from "../../constants/SETTINGS";

export const AddSkillModal = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser, setTempUser } = useTempUserStore();

  const [skill, setSkill] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!tempUser) return null;

  const skills = forCurrentUser
    ? tempUser.professionalInfo.skills ?? []
    : tempUser.matchingPreferences.lookingForSkills ?? [];

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkill(value);

    if (!value.trim()) {
      setError(true);
      setErrorMessage(MODALS.ADD_SKILL_MODAL.NO_VALUE_ERROR);
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSkill = skill.trim();
    if (!newSkill) return;

    const exists = skills.some((s) => s.toLowerCase() === newSkill.toLowerCase());

    if (skills.length >= SETTINGS.MAX_SKILL_COUNT) return;

    if (exists) {
      setError(true);
      setErrorMessage(MODALS.ADD_SKILL_MODAL.SKILL_EXISTS_ERROR);
      setSkill("");
      return;
    }

    if (forCurrentUser) {
      setTempUser({
        ...tempUser,
        professionalInfo: {
          ...tempUser.professionalInfo,
          skills: [...skills, newSkill],
        },
      });
    } else {
      setTempUser({
        ...tempUser,
        matchingPreferences: {
          ...tempUser.matchingPreferences,
          lookingForSkills: [...skills, newSkill],
        },
      });
    }

    setSkill("");
    setError(false);
    closeModal();
  };

  const closeModal = () => {
    const modal = forCurrentUser
      ? (document.getElementById(MODALS.ADD_SKILL_MODAL.ID_CURRENT) as HTMLDialogElement)
      : (document.getElementById(MODALS.ADD_SKILL_MODAL.ID_MATCHING) as HTMLDialogElement);
    modal.close();
  };

  return (
    <dialog
      id={forCurrentUser ? MODALS.ADD_SKILL_MODAL.ID_CURRENT : MODALS.ADD_SKILL_MODAL.ID_MATCHING}
      className="modal"
    >
      <div className="modal-box bg-base-300">
        <h1 className="text-lg font-medium">{MODALS.ADD_SKILL_MODAL.TITLE}</h1>
        <p className="text-accent">
          {forCurrentUser ? MODALS.ADD_SKILL_MODAL.DESCRIPTION_CURRENT : MODALS.ADD_SKILL_MODAL.DESCRIPTION_MATCHING}
        </p>

        <form className="w-full mt-4 flex flex-col items-end" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full input"
            value={skill}
            placeholder={MODALS.ADD_SKILL_MODAL.PLACEHOLDER}
            maxLength={MODALS.ADD_SKILL_MODAL.SKILL_MAX_LENGTH}
            onChange={handleSkillChange}
          />

          {/* Error message */}
          <div className="min-h-6 flex items-center self-start text-error">{error && <p>{errorMessage}</p>}</div>

          <div className="flex gap-2">
            <button type="button" className="btn" onClick={closeModal}>
              {MODAL_ACTIONS.ACTION_CANCEL}
            </button>
            <button type="submit" className="btn btn-primary" disabled={!skill.trim()}>
              {MODAL_ACTIONS.ACTION_ADD}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
