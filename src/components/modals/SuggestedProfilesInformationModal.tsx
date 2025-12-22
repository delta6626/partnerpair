import { MODALS } from "../../../shared/constants/MODALS";

export const SuggestedProfilesInformationModal = () => {
  return (
    <div id={MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.ID} className="modal">
      <div className="modal-box">
        <h1 className="text-lg font-medium">{MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.TITLE}</h1>
        <p className="">{MODALS.SUGGESTED_PROFILES_INFORMATION_MODAL.DESCRIPTION}</p>
      </div>
    </div>
  );
};
