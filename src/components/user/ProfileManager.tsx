import { UserCircle2 } from "lucide-react";

export const ProfileManager = () => {
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <UserCircle2 />
        <h1 className="text-lg">Profile</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="">
          <p className="mt-4">First name</p>
          <input type="text" className="mt-2 input w-96" placeholder="First name" />
        </div>
        <div className="">
          <p className="mt-4">Last name</p>
          <input type="text" className="mt-2 input w-96" placeholder="Last name" />
        </div>
      </div>
    </div>
  );
};
