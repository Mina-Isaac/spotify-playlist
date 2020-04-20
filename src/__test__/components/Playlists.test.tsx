import React from "react";
import ReactDOM from "react-dom";
import Playlists from "../../components/Playlists";
import renderer from "react-test-renderer";
import { store, Provider } from "../../tree/Root";

describe("Playlists component should render without issues", () => {
  beforeEach(() => {});
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider value={store}>
        <Playlists />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("component renders correctly", () => {
    const tree = renderer
      .create(
        <Provider value={store}>
          <Playlists />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
