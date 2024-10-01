import { create } from "zustand"

export const useUserStrore = create((set) => (
    {

        loginUserData: {},
        getLogInUser: (loginUserData) => set({ loginUserData })

    }
))
