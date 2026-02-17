import { HeartCrack } from "lucide-react";
import { Loader } from "../Loader";

export const DeleteAccount = ({
  className,
  disabled,
  showLoadingAnimation,
  onClickHandler,
}: {
  className?: string;
  disabled?: boolean;
  showLoadingAnimation?: boolean;
  onClickHandler?: () => void;
}) => {
  return (
    <button className={`btn btn-error min-w-45 ${className ?? ""}`} disabled={disabled} onClick={onClickHandler}>
      {showLoadingAnimation ? (
        <Loader />
      ) : (
        <>
          <HeartCrack size={20} />
          Delete account
        </>
      )}
    </button>
  );
};
