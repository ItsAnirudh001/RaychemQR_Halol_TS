import { AppState, AppStore } from "@/types/store-types";
import { create } from "zustand";

const data: AppState = {
  user: {},
  loading: false,
};

const useAppStore = create<AppStore>()((set) => ({
  ...data,

  setLoading: (value: boolean) => set({ loading: value }),
  setUser: (data: object) => set({ user: data }),
}));

export default useAppStore;
