import create from "zustand";
import { persist } from "zustand/middleware";

interface StoredUserData {
  user: {
    name: string;
    id: string;
  } | null;
}

interface StoredUserActions {
  setUser: (user: StoredUserData["user"]) => void;
}

export const useStoredUser = create<StoredUserData & StoredUserActions>()(
  persist((set) => ({
    user: null,

    setUser: (user) => set({ user }),
  }))
);
