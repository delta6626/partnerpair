import { HeartCrack } from "lucide-react";

export const DeleteAccount = ({ className, onClickHandler }: { className?: string; onClickHandler?: () => void }) => {
  return (
    <button className={`btn btn-error min-w-45 ${className ?? ""}`} onClick={onClickHandler}>
      <HeartCrack size={20} />
      Delete account
    </button>
  );
};
