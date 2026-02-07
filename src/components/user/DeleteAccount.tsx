import { HeartCrack } from "lucide-react";

export const DeleteAccount = ({ className }: { className?: string }) => {
  return (
    <button className={`btn btn-error min-w-45 ${className ?? ""}`}>
      <HeartCrack size={20} />
      Delete account
    </button>
  );
};
