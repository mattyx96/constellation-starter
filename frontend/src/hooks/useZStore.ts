import { StoreApi } from 'zustand';
import { useEffect, useState } from 'react';

export const useZStore = <T>(store: StoreApi<T>) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    return store.subscribe((state) => setState(state));
  }, [store]);

  return { ...state, setZState: store.setState };
};
