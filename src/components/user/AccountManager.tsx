import { User2 } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import type { ChangeEvent } from "react";
import type { AppTheme } from "../../types/AppTheme";
import { SignOut } from "./SignOut";
import { DeleteAccount } from "./DeleteAccount";

export const AccountManager = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as AppTheme);
  };

  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-8">
      <div className="flex items-center gap-2">
        <User2 />
        <h1 className="text-lg font-medium">Account</h1>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p>Theme preference</p>
        <select className="select max-w-45" value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p>Sign out</p>
        <SignOut applyMinimumWidth={true} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p>Delete account</p>
        <DeleteAccount />
      </div>
    </div>
  );
};
