import { MODALS } from "../../constants/MODALS";

export const AddSkillModal = () => {
  return (
    <dialog id={MODALS.ADD_SKILL_MODAL.ID} className="modal">
      <div className="modal-box"></div>
    </dialog>
  );
};
