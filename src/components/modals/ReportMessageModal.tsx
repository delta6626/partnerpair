import { Flag } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { useState } from "react";

export const ReportMessageModal = () => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  return (
    <dialog id={MODALS.REPORT_MESSAGE_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <Flag size={20} className="text-error/60" />
          <h1 className="text-lg font-medium">{MODALS.REPORT_MESSAGE_MODAL.TITLE}</h1>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {MODALS.REPORT_MESSAGE_MODAL.REASONS.map((reason) => {
            return <button className="btn w-full">{reason}</button>;
          })}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button type="button" className="btn">
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>

          <button type="button" className="btn bg-error/60 hover:bg-error">
            {MODAL_ACTIONS.ACTION_REPORT}
          </button>
        </div>
      </div>
    </dialog>
  );
};
