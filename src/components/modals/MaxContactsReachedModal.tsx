import { CheckCircle2 } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { UpgradeTierButton } from "../user/UpgradeTierButton";

export const MaxContactsReachedModal = () => {
  const closeModal = () => {
    const modal = document.getElementById(MODALS.MAX_CONTACTS_REACHED_ERROR_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.MAX_CONTACTS_REACHED_ERROR_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={20} className="text-primary" />
          <h1 className="text-lg font-medium">{MODALS.MAX_CONTACTS_REACHED_ERROR_MODAL.TITLE}</h1>
        </div>
        <p className="mt-2 text-accent">{MODALS.MAX_CONTACTS_REACHED_ERROR_MODAL.DESCRIPTION}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="btn" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>

          <UpgradeTierButton />
        </div>
      </div>
    </dialog>
  );
};
