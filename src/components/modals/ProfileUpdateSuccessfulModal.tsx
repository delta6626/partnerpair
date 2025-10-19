import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";

export const ProfileUpdateSuccessfulModal = () => {
  const closeModal = () => {
    const modal = document.getElementById(MODALS.PROFILE_UPDATE_SUCCESS_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.PROFILE_UPDATE_SUCCESS_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300">
        <h1 className="text-lg font-medium">{MODALS.PROFILE_UPDATE_SUCCESS_MODAL.TITLE}</h1>
        <p className="text-accent">{MODALS.PROFILE_UPDATE_SUCCESS_MODAL.DESCRIPTION}</p>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn btn-primary" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>
        </div>
      </div>
    </dialog>
  );
};
