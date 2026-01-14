import { UserRoundCog } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import type { ChangeEvent } from "react";
import type { AppTheme } from "../../../shared/types/AppTheme";
import { SignOut } from "./SignOut";
import { DeleteAccount } from "./DeleteAccount";
import { useTempUserStore } from "../../store/useTempUserStore";

export const AccountManager = () => {
  const { theme, setTheme } = useTheme();

  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleEmailPermissionsChange = (permission: boolean) => {
    setTempUser({
      ...tempUser,
      basicInfo: { ...tempUser.basicInfo, emailNotificationsAllowed: permission },
    });
  };

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as AppTheme);
  };

  return (
    <div className="max-w-200 border border-base-100 rounded-3xl p-8">
      <div className="flex items-center gap-2">
        <UserRoundCog size={20} />
        <h1 className="text-lg font-medium">Account</h1>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p>Allow email notifications</p>
        <div className="flex gap-4 ">
          <div className="flex gap-2">
            <p>Yes</p>
            <input
              type="radio"
              name="emailNotifications"
              className="radio radio-primary"
              checked={tempUser.basicInfo.emailNotificationsAllowed}
              onChange={() => {
                handleEmailPermissionsChange(true);
              }}
            />
          </div>
          <div className="flex gap-2">
            <p>No</p>
            <input
              type="radio"
              name="emailNotifications"
              className="radio radio-primary"
              checked={!tempUser.basicInfo.emailNotificationsAllowed}
              onChange={() => {
                handleEmailPermissionsChange(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p>Theme preference</p>
        <select className="select max-w-45" value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p>Sign out</p>
        <SignOut applyMinimumWidth={true} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p>Delete account</p>
        <DeleteAccount />
      </div>
    </div>
  );
};
