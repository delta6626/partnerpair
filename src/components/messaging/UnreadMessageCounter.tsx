import { Mail } from "lucide-react";
import { DASHBOARD } from "../../../shared/constants/DASHBOARD";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getAllUnreadMessageCount } from "../../services/messaging/messagingServices";
import { Loader } from "../Loader";

export const UnreadMessageCounter = () => {
  const navigate = useNavigate();

  const {
    data: unreadMessageCount,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.UNREAD_COUNT],
    queryFn: getAllUnreadMessageCount,
    refetchInterval: 15 * 1000,
  });

  const handleUnreadMessageCounterClick = () => {
    navigate("/messages");
  };

  if (isLoading)
    return (
      <div className="rounded-3xl bg-base-200 min-w-75 w-fit flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <button
      className="cursor-pointer p-4 rounded-3xl border border-base-100 bg-base-200 min-w-75 w-fit flex flex-col gap-2"
      onClick={handleUnreadMessageCounterClick}
    >
      <div className="flex gap-2 text-accent items-center">
        <Mail className="mt-[-1px]" size={20} />
        Unread Messages
        {unreadMessageCount != 0 ? (
          <div className="w-2 h-2 rounded-full bg-error animate-[blink_1.5s_ease-in-out_infinite] mt-[1.5px]"></div>
        ) : (
          ""
        )}
      </div>

      {!isError && (
        <div className="mt-4 text-center">
          <h1 className="text-3xl font-bold">{unreadMessageCount}</h1>
          <p className="mt-2 text-accent">{DASHBOARD.UNREAD_MESSAGE_COUNTER_SUBTEXT}</p>
        </div>
      )}

      {isError && (
        <div className="">
          <h1 className="text-error font-semibold">An error occured</h1>
          <p className="text-accent">{error.message}</p>
        </div>
      )}
    </button>
  );
};
