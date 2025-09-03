import { useState, type ChangeEvent, type FormEvent } from "react";
import { MODAL_ACTIONS } from "../../constants/MODAL_ACTIONS";
import { MODALS } from "../../constants/MODALS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SETTINGS } from "../../constants/SETTINGS";

export const AddSkillModal = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  const [skill, setSkill] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!tempUser) return;

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
    if (e.target.value === "") {
      setErrorMessage(MODALS.ADD_SKILL_MODAL.NO_VALUE_ERROR);
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const skillLowercase = skill.toLowerCase();
    const exists = tempUser.professionalInfo.skills.some((s) => s.toLowerCase() === skillLowercase);

    // Redundant check to ensure skill never exceeds max
    if (tempUser.professionalInfo.skills.length === SETTINGS.MAX_SKILL_COUNT) return;

    if (exists) {
      setErrorMessage(MODALS.ADD_SKILL_MODAL.SKILL_EXISTS_ERROR);
      setError(true);
      setSkill("");
    } else {
      setError(false);
      setTempUser({
        ...tempUser,
        professionalInfo: { ...tempUser.professionalInfo, skills: [...tempUser.professionalInfo.skills, skill] },
      });
      setSkill("");
      closeModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(MODALS.ADD_SKILL_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.ADD_SKILL_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300">
        <h1 className="text-lg font-medium">{MODALS.ADD_SKILL_MODAL.TITLE}</h1>
        <p className="text-accent">{MODALS.ADD_SKILL_MODAL.DESCRIPTION}</p>

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
          <div className="min-h-6 flex items-center self-start text-error">
            {error === true && <p>{errorMessage}</p>}
          </div>

          <div className="flex gap-2">
            <button type="button" className="btn" onClick={closeModal}>
              {MODAL_ACTIONS.ACTION_CANCEL}
            </button>
            <button type="submit" className="btn btn-primary" disabled={skill.length === 0}>
              {MODAL_ACTIONS.ACTION_ADD}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
