import { Mail } from "lucide-react";

export const UnreadMessageCounter = () => {
  return (
    <div className="cursor-pointer p-4 rounded-3xl bg-base-200 min-w-75 w-fit flex flex-col gap-2">
      <div className="flex gap-2 text-accent items-center">
        <Mail size={20} />
        Unread Messages
      </div>

      <div className="mt-4 text-center">
        <h1 className="text-3xl font-bold">{0}</h1>
      </div>
    </div>
  );
};
