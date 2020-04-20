import Playlists from "../../tree/Playlists";
import { getSnapshot } from "mobx-state-tree";

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
