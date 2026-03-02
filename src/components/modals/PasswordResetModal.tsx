import { AlertCircle, Check, MailIcon } from "lucide-react";
import { MODAL_ACTIONS } from "../../../shared/constants/MODAL_ACTIONS";
import { MODALS } from "../../../shared/constants/MODALS";
import { useState, type ChangeEvent } from "react";
import { isValidEmail } from "../../../shared/utils/isValidEmail";
import { sendFirebasePasswordResetEmail } from "../../services/authentication/authServices";
import { Loader } from "../Loader";

export const PasswordResetModal = () => {
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(isValidEmail(e.target.value));
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    const emailSent = await sendFirebasePasswordResetEmail(email); // Returns a boolean
    setSuccess(emailSent);
    setLoading(false);
  };

  const closeModal = () => {
    const modal = document.getElementById(MODALS.PASSWORD_RESET_MODAL.ID) as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id={MODALS.PASSWORD_RESET_MODAL.ID} className="modal">
      <div className="modal-box bg-base-300 border border-base-100">
        <div className="flex items-center gap-2">
          {success === null && <MailIcon size={20} className="text-primary" />}
          {success === true && <Check size={20} className="text-primary" />}
          {success === false && <AlertCircle size={20} className="text-error/60" />}
          {success === null && <h1 className="text-lg font-medium">{MODALS.PASSWORD_RESET_MODAL.TITLE}</h1>}
          {success === true && <h1 className="text-lg font-medium">{MODALS.PASSWORD_RESET_MODAL.TITLE_SUCCESS}</h1>}
          {success === false && <h1 className="text-lg font-medium">{MODALS.PASSWORD_RESET_MODAL.TITLE_ERROR}</h1>}
        </div>

        <p className="mt-2 text-accent">
          {success === null && MODALS.PASSWORD_RESET_MODAL.DESCRIPTION}
          {success === true && MODALS.PASSWORD_RESET_MODAL.SUCCESS_MESSAGE}
          {success === false && MODALS.PASSWORD_RESET_MODAL.ERROR_MESSAGE}
        </p>

        {success === null && (
          <input
            type="email"
            className="input w-full mt-4"
            placeholder={"Enter your email"}
            value={email}
            onChange={handleEmailChange}
          />
        )}

        <div className={`flex gap-2 justify-end ${success === null ? "mt-2" : "mt-4"}`}>
          <button type="button" className="btn flex-grow" onClick={closeModal}>
            {success === null && MODAL_ACTIONS.ACTION_CANCEL}
            {(success === true || success === false) && MODAL_ACTIONS.ACTION_OK}
          </button>

          {success === null && (
            <button
              type="button"
              disabled={!emailValid}
              className="btn btn-primary flex-grow"
              onClick={handlePasswordReset}
            >
              {loading ? <Loader /> : MODAL_ACTIONS.ACTION_SEND}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};
