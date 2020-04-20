import Tracks from "../../tree/Tracks";
import { getSnapshot, onPatch } from "mobx-state-tree";

const sample = {
  loading: false,
  next: "some url",
  items: [
    {
      track: {
        artists: [{ id: "some id", name: "some name", type: "some type" }],
      },
    },
  ],
  total: 24,
};

it("should create a model instance", () => {
  const item = Tracks.create(sample);
  expect(getSnapshot(item)).toMatchSnapshot();
});

it("reset model", () => {
  const item = Tracks.create(sample);
  const patches: any = [];

  onPatch(item, (patch) => {
    patches.push(patch);
  });

  item.clearTracks();
  expect(patches).toMatchSnapshot();
});
