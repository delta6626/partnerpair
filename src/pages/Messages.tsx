import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { ProfileStatusMessage } from "../components/user/ProfileStatusMessage";
import { MESSAGES } from "../../shared/constants/MESSAGES";
import { ChatInbox } from "../components/messaging/ChatInbox";
import { ChatViewer } from "../components/messaging/ChatViewer";
import { Loader } from "../components/Loader";
import { GenericErrorModal } from "../components/modals/GenericErrorModal";
import { MODALS } from "../../shared/constants/MODALS";

export const Messages = () => {
  useTheme();
  const { loading } = useInitializeUser();

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-col grow min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="pt-8 flex flex-col flex-1">
            <div className="mb-4">
              <ProfileStatusMessage />

              <GenericErrorModal
                modalId={MODALS.CHAT_DELETE_ERROR_MODAL.ID}
                errorTitle={MODALS.CHAT_DELETE_ERROR_MODAL.TITLE}
                errorText={MODALS.CHAT_DELETE_ERROR_MODAL.DESCRIPTION}
              />
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="font-bold text-3xl">Messages</h1>
                  <p className="text-accent">{MESSAGES.MESSAGE_SUBTEXT}</p>
                </div>

                <ChatInbox />
              </div>

              <ChatViewer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
