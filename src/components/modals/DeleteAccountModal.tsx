import { AlertCircle } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { DeleteAccount } from "../user/DeleteAccount";
import { useState, type ChangeEvent } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";

export const DeleteAccountModal = () => {
  const deleteAccount = httpsCallable(functions, "deleteAccount");

  const [passPhrase, setPassPhrase] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePassPhraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassPhrase(e.target.value);
  };

  const closeModal = () => {
    const modal = document.getElementById(MODALS.DELETE_ACCOUNT_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  const handleAccountDeletion = async () => {
    setLoading(true);
    try {
      await deleteAccount();
      setLoading(false);
      const successModal = document.getElementById(MODALS.ACCOUNT_DELETION_SUCCESS_MODAL.ID) as HTMLDialogElement;
      successModal.showModal();
      closeModal(); // Close current modal
    } catch (error) {
      setLoading(false);
      const errorModal = document.getElementById(MODALS.ACCOUNT_DELETION_FAILED_MODAL.ID) as HTMLDialogElement;
      errorModal.showModal();
    }
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

        <p className="mt-2 cursor-default select-none">
          {MODALS.DELETE_ACCOUNT_MODAL.DESCRIPTION} To confirm, type{" "}
          <span className="text-error">{SETTINGS.ACCOUNT_DELETION_PASS_PHRASE}</span> below.
        </p>

        <input
          className="input w-full mt-4"
          placeholder="Type your confirmation"
          value={passPhrase}
          onChange={handlePassPhraseChange}
        />

        <div className="flex gap-x-2 mt-2">
          <button type="button" className="btn flex-1" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>

          <DeleteAccount
            className="flex-1"
            disabled={passPhrase !== SETTINGS.ACCOUNT_DELETION_PASS_PHRASE}
            onClickHandler={handleAccountDeletion}
            showLoadingAnimation={loading}
          />
        </div>
      </div>
    </dialog>
  );
};
