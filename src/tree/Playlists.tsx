import { types, flow, Instance } from "mobx-state-tree";
import appService from "./service";

interface IPlaylist extends Instance<typeof playlist> {}
export interface IPlaylists extends Instance<typeof Playlists> {}

const image = types.model({
  height: types.union(types.number, types.null),
  width: types.union(types.number, types.null),
  url: types.string,
});

const owner = types.model({
  display_name: types.string,
});

const playlist = types.model({
  id: types.identifier,
  name: types.string,
  description: types.string,
  images: types.array(image),
  owner,
});

const Playlists = types
  .model({
    items: types.array(playlist),
    next: types.union(types.string, types.null),
    total: types.number,
    loading: types.boolean,
  })
  .actions((self) => {
    const fetchNext = flow(function* () {
      if (self.next === null) return;
      self.loading = true;
      try {
        const newlyFetched = yield appService.fetchPlaylists(self.next);
        self.next = newlyFetched.next;
        self.loading = false;
        (newlyFetched.items as Array<IPlaylist>).forEach((item) =>
          self.items.push(item)
        );
      } catch (error) {
        console.error("Failed to fetch projects", error);
        self.loading = false;
      }
      return;
    });
    return { fetchNext };
  });

export default Playlists;
