import { UserCircle2 } from "lucide-react";
import { type ChangeEvent } from "react";
import { ProfilePhotoSelector } from "./ProfilePhotoSelector";
import { useTempUserStore } from "../../store/useTempUserStore";
import { LocationPicker } from "./LocationPicker";
import { isValidAge } from "../../utils/isValidAge";
import { SIGNUP } from "../../constants/SIGNUP";
import { PhoneInput } from "./PhoneInput";

export const ProfileManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, firstName: e.target.value } });
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, lastName: e.target.value } });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, email: e.target.value } });
  };

  const handleDateOfBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!isValidAge(date, SIGNUP.MINIMUM_AGE, SIGNUP.MAXIMUM_AGE)) return;
    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, dateOfBirth: date } });
  };

  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <UserCircle2 />
        <h1 className="text-lg">Basic Profile</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <p className="mt-4">First name</p>
          <input
            type="text"
            className="mt-2 input w-full"
            placeholder="First name"
            value={tempUser?.basicInfo.firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="w-full">
          <p className="mt-4">Last name</p>
          <input
            type="text"
            className="mt-2 input w-full"
            placeholder="Last name"
            value={tempUser?.basicInfo.lastName}
            onChange={handleLastNameChange}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <p className="mt-4">Email</p>
          <input
            type="email"
            className="mt-2 input w-full"
            placeholder="Email"
            value={tempUser?.basicInfo.email}
            disabled={tempUser?.basicInfo.authenticationMethod === "Google"}
            onChange={handleEmailChange}
          />
        </div>
        <div className="w-full">
          <p className="mt-4">Location</p>
          <div className="mt-2"></div>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <p className="mt-4">Date of birth</p>
          <input
            type="date"
            className="mt-2 input w-full"
            placeholder="Date of birth"
            value={tempUser.basicInfo.dateOfBirth}
            min={"1900-01-01"}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <div className="w-full">
          <p className="mt-4">Phone</p>
          <div className="mt-2">
            <PhoneInput />
          </div>
        </div>
      </div>

      <div className="">
        <p className="mt-4">Profile photo</p>
        <div className="mt-2">
          <ProfilePhotoSelector />
        </div>
      </div>
    </div>
  );
};
