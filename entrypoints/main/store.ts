import { create } from "zustand";

type State = {
  count: number;
  groupId: number;
  groups: chrome.tabGroups.TabGroup[];
  tabs: chrome.tabs.Tab[];
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  setGroupId: (groupId: number) => void;
  setGroups: (groups: chrome.tabGroups.TabGroup[]) => void;
  setTabs: (tabs: chrome.tabs.Tab[]) => void;
};

export const useStore = create<State & Actions>((set) => ({
  count: 0,
  groupId: chrome.tabGroups.TAB_GROUP_ID_NONE,
  groups: [],
  tabs: [],
  increment: (qty) => set((state) => ({ count: state.count + qty })),
  decrement: (qty) => set((state) => ({ count: state.count - qty })),
  setGroupId: (groupId) => set({ groupId }),
  setGroups: (groups) => set({ groups }),
  setTabs: (tabs) => set({ tabs }),
}));
