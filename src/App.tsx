import React from "react";
import { Provider, store } from "./tree/Root";
import Playlists from "./components/Playlists";
import Tracks from "./components/Tracks";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Provider value={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/spotify-playlist/" exact component={Playlists} />
          <Route path="/spotify-playlist/artists/:id" component={Tracks} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
