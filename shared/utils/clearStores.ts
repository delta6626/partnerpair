import { useUserStore } from "../../src/store/useUserStore";
import { useSelectedChatStore } from "../../src/store/useSelectedChatStore";
import { useSelectedChatMetaDataStore } from "../../src/store/useSelectedChatMetaData";
import { useProfileStatusVisibleStore } from "../../src/store/useProfileStatusVisibleStore";
import { useFilterMenuStore } from "../../src/store/useFilterMenuStore";

export const clearStores = () => {
  useUserStore.getState().resetUser();
  useSelectedChatStore.getState().setSelectedChatId(null);
  useSelectedChatMetaDataStore.getState().setSelectedChatMetaData(null);
  useProfileStatusVisibleStore.getState().setStatusVisible(false);
  useFilterMenuStore.getState().setIsOpen(false);
};
