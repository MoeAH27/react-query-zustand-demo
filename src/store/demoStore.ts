import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    isModelOpen: boolean;
    toggleModel: () => void;
}

export const useDemoStore = create<State>()(
    persist(
        (set) => ({
            isModelOpen: false,
            toggleModel: () => set((state) => ({ isModelOpen: !state.isModelOpen })),
        }),
        {
            name: "demo-store",
        }
    )
);