import { MODALS } from "../../constants/MODALS";

export const AddRoleModal = () => {
  return (
    <dialog id={MODALS.ADD_ROLE_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300">
        <h1 className="text-lg font-medium">{MODALS.ADD_ROLE_MODAL.TITLE}</h1>
        <p className="text-accent">{MODALS.ADD_ROLE_MODAL.DESCRIPTION}</p>
      </div>
    </dialog>
  );
};
