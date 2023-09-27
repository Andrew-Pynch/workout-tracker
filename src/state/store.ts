
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserState, userStore } from "./userStore";

export type StoreSchema = UserState;

export const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "userStore",
      getStorage: () => localStorage,
    }),
    {
      name: "userStore",
    }
  )
);

export const clearStores = () => {
  useUserStore.getState().clear();
};
