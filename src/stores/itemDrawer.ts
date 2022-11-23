import create from "zustand";

type DrawerContext =
  | {
      type: "create";
    }
  | {
      type: "edit";
      id: string;
    };

interface DrawerData {
  context: DrawerContext | null;
}

interface DrawerActions {
  openDrawer: (ctx: DrawerContext) => void;
  closeDrawer: () => void;
}

export const useItemDrawer = create<DrawerData & DrawerActions>()((set) => ({
  context: null,

  openDrawer: (ctx) => set({ context: ctx }),
  closeDrawer: () => set({ context: null }),
}));
