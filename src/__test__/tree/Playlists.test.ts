import Playlists from "../../tree/Playlists";
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { reaction } from "mobx";

it("should create a model instance", () => {
  const item = Playlists.create({
    items: [
      {
        description: "some text",
        id: "some id",
        name: "some name",
        owner: {
          display_name: "some name",
        },
        images: [{ url: "some url", height: 44, width: null }],
      },
    ],
    loading: false,
    next: "some url",
    total: 13,
  });

  expect(getSnapshot(item)).toMatchSnapshot();
});
