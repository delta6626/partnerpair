import { AlertCircle } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { DeleteAccount } from "../user/DeleteAccount";
import { useState, type ChangeEvent } from "react";

export const DeleteAccountModal = () => {
  const [passPhrase, setPassPhrase] = useState<string>("");

  const handlePassPhraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassPhrase(e.target.value);
  };

  const closeModal = () => {
    const modal = document.getElementById(MODALS.DELETE_ACCOUNT_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog
      id={MODALS.DELETE_ACCOUNT_MODAL.ID}
      className="modal"
      onClose={() => {
        setPassPhrase("");
      }}
    >
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-error" />
          <h1 className="text-lg font-medium text-error">{MODALS.DELETE_ACCOUNT_MODAL.TITLE}</h1>
        </div>
        <p className="mt-2">
          {MODALS.DELETE_ACCOUNT_MODAL.DESCRIPTION} To confirm, type{" "}
          <span className="text-error">{SETTINGS.ACCOUNT_DELETION_PASS_PHRASE}</span> below.
        </p>

        <input
          className="input w-full mt-2"
          placeholder="Type your confirmation"
          value={passPhrase}
          onChange={handlePassPhraseChange}
        />

        <div className="flex gap-x-2 mt-4">
          <button type="button" className="btn flex-1" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>

          <DeleteAccount className="flex-1" disabled={passPhrase !== SETTINGS.ACCOUNT_DELETION_PASS_PHRASE} />
        </div>
      </div>
    </dialog>
  );
};
