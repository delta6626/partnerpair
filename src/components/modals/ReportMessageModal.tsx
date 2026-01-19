import { Flag } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";

export const ReportMessageModal = () => {
  return (
    <dialog id={MODALS.REPORT_MESSAGE_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <Flag size={20} className="text-error" />
          <h1 className="text-lg font-medium">{MODALS.REPORT_MESSAGE_MODAL.TITLE}</h1>
        </div>

        <div className="flex justify-end mt-4">
          <button type="button" className="btn">
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>

          <button type="button" className="btn btn-error">
            {MODAL_ACTIONS.ACTION_REPORT}
          </button>
        </div>
      </div>
    </dialog>
  );
};
