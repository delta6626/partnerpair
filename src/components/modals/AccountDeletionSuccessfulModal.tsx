import { Frown } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { useNavigate } from "react-router-dom";

export const AccountDeletionSuccessfulModal = () => {
  const navigate = useNavigate();

  const showLandingPage = () => {
    navigate("/");
  };

  const closeModal = () => {
    const modal = document.getElementById(MODALS.ACCOUNT_DELETION_SUCCESS_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.ACCOUNT_DELETION_SUCCESS_MODAL.ID} className="modal" onClose={showLandingPage}>
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <Frown size={20} className="text-primary" />
          <h1 className="text-lg font-medium">{MODALS.ACCOUNT_DELETION_SUCCESS_MODAL.TITLE}</h1>
        </div>
        <p className="mt-2 text-accent">{MODALS.ACCOUNT_DELETION_SUCCESS_MODAL.DESCRIPTION}</p>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>
        </div>
      </div>
    </dialog>
  );
};
