import { MODALS } from "../../constants/MODALS";

export const AddSkillModal = () => {
  return (
    <dialog id={MODALS.ADD_SKILL_MODAL.ID} className="modal">
      <div className="modal-box">
        <h1 className="text-xl font-medium">{MODALS.ADD_SKILL_MODAL.TITLE}</h1>
        <p>{MODALS.ADD_SKILL_MODAL.DESCRIPTION}</p>
      </div>
    </dialog>
  );
};
