import {create} from "zustand";
import {IStorePort} from "./core/ports/IStorePort";

export const authStore = create<IStorePort>(() => ({
  token: "",
  user: undefined,
  loading: false
}))
