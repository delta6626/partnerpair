import type { ReportedMessage } from "./ReportedMessage";

export interface SelectedMessageStore {
  selectedMessage: ReportedMessage | null;
  setSelectedMessage: (message: ReportedMessage | null) => void;
}
