import { HeartCrack } from "lucide-react";

export const DeleteAccount = ({
  className,
  disabled,
  onClickHandler,
}: {
  className?: string;
  disabled?: boolean;
  onClickHandler?: () => void;
}) => {
  return (
    <button className={`btn btn-error min-w-45 ${className ?? ""}`} disabled={disabled} onClick={onClickHandler}>
      <HeartCrack size={20} />
      Delete account
    </button>
  );
};
