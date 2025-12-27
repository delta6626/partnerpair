import { useSelectedChatStore } from "../../store/useSelectedChatStore";

export const ChatViewer = () => {
  const { selectedChatId } = useSelectedChatStore();

  return (
    <div className="w-full flex flex-1 bg-base-200 rounded-3xl">
      {!selectedChatId && <div className="flex flex-1 items-center justify-center text-accent"></div>}
    </div>
  );
};
