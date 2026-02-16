import { AlertCircle } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";

export const DeleteAccountModal = () => {
  const closeModal = () => {
    const modal = document.getElementById(MODALS.DELETE_ACCOUNT_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.DELETE_ACCOUNT_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-error/60" />
          <h1 className="text-lg font-medium">{MODALS.DELETE_ACCOUNT_MODAL.TITLE}</h1>
        </div>
        <p className="mt-2 text-accent">{MODALS.DELETE_ACCOUNT_MODAL.DESCRIPTION}</p>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>
        </div>
      </div>
    </dialog>
  );
};
