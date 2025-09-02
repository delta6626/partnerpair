import { useState, type ChangeEvent, type FormEvent } from "react";
import { MODAL_ACTIONS } from "../../constants/MODAL_ACTIONS";
import { MODALS } from "../../constants/MODALS";
import { useTempUserStore } from "../../store/useTempUserStore";

export const AddSkillModal = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  const [skill, setSkill] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  if (!tempUser) return;

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);

    if (skill != "") {
      setError(false);
      return;
    }

    setError(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            placeholder={MODALS.ADD_SKILL_MODAL.PLACEHOLDER}
            onChange={handleSkillChange}
          />
          <div className="flex mt-2 gap-2">
            <button type="button" className="btn">
              {MODAL_ACTIONS.ACTION_CANCEL}
            </button>
            <button type="submit" className="btn btn-primary">
              {MODAL_ACTIONS.ACTION_ADD}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
