import { UserCircle2 } from "lucide-react";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { useState } from "react";

export const ProfileManager = () => {
  const { user } = useInitializeUser();

  const [firstName, setFirstName] = useState(user?.basicInfo.firstName);
  const [lastName, setLastName] = useState(user?.basicInfo.lastName);
  const [email, setEmail] = useState(user?.basicInfo.email);

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <UserCircle2 />
        <h1 className="text-lg">Profile</h1>
      </div>

      <div className="flex flex-row gap-2">
        <div className="">
          <p className="mt-4">First name</p>
          <input type="text" className="mt-2 input w-96" placeholder="First name" value={firstName} />
        </div>
        <div className="">
          <p className="mt-4">Last name</p>
          <input type="text" className="mt-2 input w-96" placeholder="Last name" value={lastName} />
        </div>
      </div>

      <div className="">
        <p className="mt-4">Email</p>
        <input
          type="email"
          className="mt-2 input w-194"
          placeholder="Email"
          value={email}
          disabled={user?.basicInfo.authenticationMethod === "Google"}
        />
      </div>
    </div>
  );
};
