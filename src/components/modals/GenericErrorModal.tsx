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
        <h1 className="text-lg text-error font-medium">{errorTitle}</h1>
        <p className="mt-2 text-error/60">{errorText}</p>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>
        </div>
      </div>
    </dialog>
  );
};
