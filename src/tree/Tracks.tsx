import { types, flow, Instance } from "mobx-state-tree";
import appService from "./service";

interface ITrack extends Instance<typeof track> {}

const artist = types.model({
  id: types.identifier,
  name: types.string,
  type: types.string,
});

const track = types.model({
  track: types.model({
    artists: types.array(artist),
  }),
});

const Tracks = types
  .model({
    items: types.array(track),
    next: types.union(types.string, types.null),
    total: types.number,
    loading: types.boolean,
  })
  .actions((self) => {
    const fetchNext = flow(function* (id?) {
      if (self.next === null) return;
      self.loading = true;
      try {
        const newlyFetched = yield appService.fetchTracks(id, self.next);
        self.next = newlyFetched.next;
        (newlyFetched.items as Array<ITrack>).forEach((item) =>
          self.items.push(item)
        );
        self.loading = false;
      } catch (error) {
        console.error("Failed to fetch projects", error);
        self.loading = false;
      }
      return;
    });
    const clearTracks = () => {
      self.items.clear();
      self.loading = true;
      self.next = "";
      self.total = 0;
    };
    return { fetchNext, clearTracks };
  });

export default Tracks;
