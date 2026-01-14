import { UserCircle2 } from "lucide-react";
import { type ChangeEvent } from "react";
import { ProfilePhotoSelector } from "./ProfilePhotoSelector";
import { useTempUserStore } from "../../store/useTempUserStore";
import { isValidAge } from "../../../shared/utils/isValidAge";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { PhoneInput } from "./PhoneInput";
import { CountryPicker } from "./CountryPicker";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

export const ProfileManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({
      ...tempUser,
      basicInfo: {
        ...tempUser.basicInfo,
        firstName: e.target.value,
        profileImageUrl: `${SETTINGS.DICEBEAR_API_URL}${e.target.value}`,
      },
    });
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
    <div className="max-w-200 border border-base-100 rounded-3xl p-8">
      <div className="flex items-center gap-2">
        <UserCircle2 />
        <h1 className="text-lg font-medium">Basic Profile</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <p className="mt-4 text-accent">First name</p>
          <input
            type="text"
            className="mt-2 input w-full"
            placeholder="First name"
            value={tempUser?.basicInfo.firstName}
            maxLength={SIGNUP.MAXIMUM_FIRST_NAME_LENGTH}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="w-full">
          <p className="mt-4 text-accent">Last name</p>
          <input
            type="text"
            className="mt-2 input w-full"
            placeholder="Last name"
            value={tempUser?.basicInfo.lastName}
            maxLength={SIGNUP.MAXIMUM_LAST_NAME_LENGTH}
            onChange={handleLastNameChange}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <p className="mt-4 text-accent">Email</p>
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
          <p className="mt-4 text-accent">Location</p>
          <div className="mt-2">
            <CountryPicker />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <p className="mt-4 text-accent">Date of birth</p>
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
          <p className="mt-4 text-accent">Phone</p>
          <div className="mt-2">
            <PhoneInput />
          </div>
        </div>
      </div>

      <div className="">
        <p className="mt-4 text-accent">Profile photo</p>
        <div className="mt-2">
          <ProfilePhotoSelector />
        </div>
      </div>
    </div>
  );
};
