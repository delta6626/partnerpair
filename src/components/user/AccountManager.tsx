import { User2 } from "lucide-react";

export const AccountManager = () => {
  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <User2 />
        <h1>Account</h1>
      </div>
    </div>
  );
};
