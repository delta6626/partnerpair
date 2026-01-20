import { CheckCircle2 } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";

export const AbuseReportSuccessfulModal = () => {
  const closeModal = () => {
    const modal = document.getElementById(MODALS.ABUSE_REPORT_SUCCESSFUL_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.ABUSE_REPORT_SUCCESSFUL_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={20} className="text-primary" />
          <h1 className="text-lg font-medium">{MODALS.ABUSE_REPORT_SUCCESSFUL_MODAL.TITLE}</h1>
        </div>
        <p className="mt-2 text-accent">{MODALS.ABUSE_REPORT_SUCCESSFUL_MODAL.DESCRIPTION}</p>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>
        </div>
      </div>
    </dialog>
  );
};
