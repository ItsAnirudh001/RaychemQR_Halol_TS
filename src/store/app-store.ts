import { AppState, AppStore } from "@/types/store-types";
import { create } from "zustand";

const data: AppState = {
  loading: false,
};

const useAppStore = create<AppStore>()((set) => ({
  ...data,

  setLoading: (value: boolean) => set({ loading: value })
}));

export default useAppStore;
