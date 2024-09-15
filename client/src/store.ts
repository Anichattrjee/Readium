import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist((set) => ({
      token: "",
      //@ts-ignore
      setToken: (data: string) => set(() => ({ token: data })),
    }),{name:'Token-Store'})
  )
);

export default useTokenStore;
