import { Flag } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { useState } from "react";
import { useSelectedMessageStore } from "../../store/useSelectedMessageStore";
import type { AbuseReport } from "../../../shared/types/AbuseReport";
import { Timestamp } from "firebase/firestore";

export const ReportMessageModal = () => {
  const { selectedMessage, setSelectedMessage } = useSelectedMessageStore();
  const [selectedReason, setSelectedReason] = useState<string>("");

  if (!selectedMessage) return;

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleModalClose = () => {
    const modal = document.getElementById(MODALS.REPORT_MESSAGE_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  const handleSubmitReport = () => {
    const abuseReport: AbuseReport = {
      reportedUserId: selectedMessage.id,
      reporterId: selectedMessage.reporterId,
      reportedMessage: selectedMessage.content,
      reportReason: selectedReason,
      reportCreatedAt: Timestamp.now(),
    };
  };

  return (
    <dialog
      id={MODALS.REPORT_MESSAGE_MODAL.ID}
      className="modal"
      onClose={() => {
        setSelectedReason("");
        setSelectedMessage(null);
      }}
    >
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <Flag size={20} className="text-error/60" />
          <h1 className="text-lg font-medium">{MODALS.REPORT_MESSAGE_MODAL.TITLE}</h1>
        </div>

        <p className="text-accent">{MODALS.REPORT_MESSAGE_MODAL.SUBTITLE}</p>

        <div className="flex flex-col gap-2 mt-4">
          {MODALS.REPORT_MESSAGE_MODAL.REASONS.map((reason, index) => {
            return (
              <button
                key={index}
                className={`btn w-full border-1 border-base-100 ${selectedReason !== reason ? "bg-transparent" : "bg-base-100"}`}
                onClick={() => {
                  handleReasonClick(reason);
                }}
              >
                {reason}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button type="button" className="btn" onClick={handleModalClose}>
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>

          <button
            type="button"
            className="btn bg-error/60 hover:bg-error"
            disabled={selectedReason === ""}
            onClick={handleSubmitReport}
          >
            {MODAL_ACTIONS.ACTION_REPORT}
          </button>
        </div>
      </div>
    </dialog>
  );
};
