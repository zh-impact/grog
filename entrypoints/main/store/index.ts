import { create } from "zustand";

import { createSpaceSlice, type SpaceSlice } from "./spaceSlice";
import { createTabGroupSlice, type TabGroupSlice } from "./tabGroupSlice";

export const useStore = create<SpaceSlice & TabGroupSlice>((...a) => ({
  ...createSpaceSlice(...a),
  ...createTabGroupSlice(...a),
}));
