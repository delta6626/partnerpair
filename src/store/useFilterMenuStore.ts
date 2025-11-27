import { create } from "zustand";
import type { FilterMenuState } from "../../shared/types/FilterMenuState";

export const useFilterMenuStore = create<FilterMenuState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
