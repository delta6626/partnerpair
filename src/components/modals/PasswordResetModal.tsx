import { MailIcon } from "lucide-react";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { MODALS } from "../../../shared/constants/MODALS";
import { useState, type ChangeEvent } from "react";
import { isValidEmail } from "../../../shared/utils/isValidEmail";

export const PassswordResetModal = () => {
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(isValidEmail(e.target.value));
  };

  const handlePasswordReset = () => {};

  const closeModal = () => {
    const modal = document.getElementById(MODALS.PASSWORD_RESET_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.PASSWORD_RESET_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          <MailIcon size={20} className="text-primary" />
          <h1 className="text-lg font-medium">{MODALS.PASSWORD_RESET_MODAL.TITLE}</h1>
        </div>

        <p className="mt-2 text-accent">{MODALS.PASSWORD_RESET_MODAL.DESCRIPTION}</p>
        <input
          type="email"
          className="input w-full mt-4"
          placeholder={"Enter your email"}
          value={email}
          onChange={handleEmailChange}
        ></input>

        <div className="flex gap-2 justify-end mt-2">
          <button type="button" className="btn flex-grow" onClick={closeModal}>
            {MODAL_ACTIONS.ACTION_CANCEL}
          </button>

          <button
            type="button"
            disabled={!emailValid}
            className="btn btn-primary flex-grow"
            onClick={handlePasswordReset}
          >
            {MODAL_ACTIONS.ACTION_SEND}
          </button>
        </div>
      </div>
    </dialog>
  );
};
