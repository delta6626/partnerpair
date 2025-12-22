import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { MODALS } from "../../../shared/constants/MODALS";

export const SuggestedProfilesInformationModal = () => {
  const handleModalClose = () => {
    const modal = document.getElementById(MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300">
        <h1 className="text-lg font-medium text-accent">{MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.TITLE}</h1>
        <p className="mt-2">{MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.DESCRIPTION}</p>

        <div className="flex w-full justify-end mt-4">
          <button className="btn" onClick={handleModalClose}>
            {MODAL_ACTIONS.ACTION_OK}
          </button>
        </div>
      </div>
    </dialog>
  );
};
