import { types, Instance } from "mobx-state-tree";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import { createContext, useContext } from "react";

export interface IRoot extends Instance<typeof Root> {}
//export type RootInstance = Instance<typeof Root>;

const Root = types.model({
  Playlists,
  Tracks,
});

export const store = Root.create({
  Playlists: {
    items: [],
    next: "",
    total: 0,
    loading: false,
  },
  Tracks: {
    items: [],
    next: "",
    total: 0,
    loading: false,
  },
});

const RootStoreContext = createContext<null | IRoot>(null);
export const { Provider } = RootStoreContext;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
