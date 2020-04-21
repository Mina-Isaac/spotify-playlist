import React, { useEffect } from "react";
import useInfiniteScroll from "../utilities/useInfiniteScroll";
import { observer } from "mobx-react";
import { useMst } from "../tree/Root";
import { useParams, useLocation } from "react-router-dom";
import { prepareData } from "../utilities/tools";

const Tracks = () => {
  const root = useMst();
  const list = root.Tracks.items.map((item) => item.track.artists).flat();
  const setIsFetching = useInfiniteScroll(moreData)[1];
  const { id } = useParams();
  const { state: playlistName } = useLocation();
  const loading = root.Tracks.loading;

  useEffect(() => {
    root.Tracks.fetchNext(id);
    return () => root.Tracks.clearTracks();
  }, []);

  function moreData() {
    root.Tracks.fetchNext();
    setIsFetching(false);
  }

  if (list.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Artists in {playlistName}</h1>
      <ul className="list">
        {prepareData(list).map((item, i) => (
          <li className="card" key={i}>
            <div className="txt">
              <span className="primary-txt">{item.name}</span>
              <span className="secondery-txt">{item.type}</span>
            </div>
          </li>
        ))}
      </ul>
      {loading && <span className="primary-text">Loading...</span>}
    </>
  );
};

export default observer(Tracks);
