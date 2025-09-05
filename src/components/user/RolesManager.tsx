import { MODALS } from "../../constants/MODALS";
import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { AddSkillModal } from "../modals/AddSkillModal";

export const RolesManager = () => {
  const { tempUser } = useTempUserStore();

  const handleAddRolesButtonClick = () => {
    const modal = document.getElementById(MODALS.ADD_ROLE_MODAL.ID) as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <>
      <AddSkillModal />

      <div className="mt-4 flex items-center justify-between">
        <p className="">Roles You Play</p>
        <button
          className="btn btn-primary"
          disabled={tempUser?.professionalInfo.roles.length === SETTINGS.MAX_ROLE_COUNT}
          onClick={handleAddRolesButtonClick}
        >
          Add roles
        </button>
      </div>
    </>
  );
};
