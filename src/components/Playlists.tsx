import React, { useEffect } from "react";
import useInfiniteScroll from "../utilities/useInfiniteScroll";
import { observer } from "mobx-react";
import { useMst } from "../tree/Root";
import { Link } from "react-router-dom";

const App = () => {
  const root = useMst();
  const list = root.Playlists.items;
  const setIsFetching = useInfiniteScroll(moreData)[1]
  const loading = root.Playlists.loading;

  function moreData() {
    root.Playlists.fetchNext();
    setIsFetching(false);
  }

  useEffect(() => {
    root.Playlists.fetchNext();
  }, []);

  if (list.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>List of featured playlists</h1>
      <ul className="list">
        {list.map((item, i) => (
          <li className="card" key={i}>
            <Link
              className="link"
              to={{
                pathname: `/spotify-playlist/artists/${item.id}`,
                state: item.name,
              }}
            >
              <img
                width={"120"}
                src={item.images[0].url}
                alt={item.description}
              />
              <div className="txt">
                <span className="primary-txt">{item.name}</span>
                <span className="secondery-txt">{`by ${item.owner.display_name}`}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {loading && <span className='primary-text'>Loading...</span> }
    </>
  );
};

export default observer(App);
