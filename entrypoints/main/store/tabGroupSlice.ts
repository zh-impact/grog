import type { StateCreator } from "zustand";

export interface TabGroupSlice {
  tabs: chrome.tabs.Tab[];
  groups: chrome.tabGroups.TabGroup[];
  groupId: number;
  setGroupId: (groupId: number) => void;
  setGroups: (groups: chrome.tabGroups.TabGroup[]) => void;
  setTabs: (tabs: chrome.tabs.Tab[]) => void;
}

export const createTabGroupSlice: StateCreator<TabGroupSlice, [], [], TabGroupSlice> = (
  set
) => ({
  tabs: [],
  groups: [],
  groupId: chrome.tabGroups.TAB_GROUP_ID_NONE,
  setTabs: (tabs) => set({ tabs }),
  setGroups: (groups) => set({ groups }),
  setGroupId: (groupId) => set({ groupId }),
});
