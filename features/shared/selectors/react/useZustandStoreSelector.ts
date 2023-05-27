import {useStore, StoreApi} from "zustand";

export const useZustandStoreSelector = <T extends {}>(store: StoreApi<T>) => {
  return useStore(store);
};
