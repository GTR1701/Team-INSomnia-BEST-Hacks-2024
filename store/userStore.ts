import { create } from "zustand";

type Store = {
    loggedInUser: string | null;
    setLoggedInUser: (username: string | undefined) => void;
}

export const useUserStore = create<Store>((set) => ({
    loggedInUser: null,
    setLoggedInUser: (username) => set({ loggedInUser: username }),
}));