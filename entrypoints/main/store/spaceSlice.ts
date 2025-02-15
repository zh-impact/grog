import type { StateCreator } from "zustand";

export interface SpaceSlice {
  currentSpace?: string;
  spaces: string[];
  windows: chrome.windows.Window[];
  currentWindow?: chrome.windows.Window;
  updateSpaces: (spaces: string[]) => void;
  updateCurrentSpace: (space: string) => void;
  updateWindows: (windows: chrome.windows.Window[]) => void;
  updateCurrentWindow: (window: chrome.windows.Window) => void;
}

export const createSpaceSlice: StateCreator<SpaceSlice, [], [], SpaceSlice> = (set) => ({
  currentSpace: undefined,
  spaces: [],
  windows: [],
  currentWindow: undefined,
  updateSpaces: (spaces) => set({ spaces }),
  updateCurrentSpace: (space) => set({ currentSpace: space }),
  updateWindows: (windows) => set({ windows }),
  updateCurrentWindow: (window) => set({ currentWindow: window }),
});
