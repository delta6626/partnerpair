import { useUserStore } from "./useUserStore";
import { useSelectedChatStore } from "./useSelectedChatStore";
import { useSelectedChatMetaDataStore } from "./useSelectedChatMetaData";
import { useProfileStatusVisibleStore } from "./useProfileStatusVisibleStore";
import { useFilterMenuStore } from "./useFilterMenuStore";
import { useSelectedMessageStore } from "./useSelectedMessageStore";

export const clearStores = () => {
  useUserStore.getState().resetUser();
  useSelectedChatStore.getState().setSelectedChatId(null);
  useSelectedChatMetaDataStore.getState().setSelectedChatMetaData(null);
  useSelectedMessageStore.getState().setSelectedMessage(null);
  useProfileStatusVisibleStore.getState().setStatusVisible(false);
  useFilterMenuStore.getState().setIsOpen(false);
};
