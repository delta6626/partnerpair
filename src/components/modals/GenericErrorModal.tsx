import { AlertCircle } from "lucide-react";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";

export const GenericErrorModal = ({
  modalId,
  errorTitle,
  errorText,
}: {
  modalId: string;
  errorTitle: string;
  errorText: string;
}) => {
  const closeModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-error" />
          <h1 className="text-lg font-medium">{errorTitle}</h1>
        </div>
        <p className="mt-2 text-accent">{errorText}</p>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>
        </div>
      </div>
    </dialog>
  );
};
