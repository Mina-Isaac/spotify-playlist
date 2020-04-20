import { PLAYLIST_ENDPOINT, TRACKS_ENDPOINT, ACCESS_TOKEN } from "../Constants";
import { IPlaylists } from './Playlists'

const appService = {
    
  fetchPlaylists(next: string): Promise<any> {
    const url = next || `${PLAYLIST_ENDPOINT}fields=playlists.items(id,images,name,owner),next,total&&limit=30&&offset=0`
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.playlists as IPlaylists);
  },

  fetchTracks(id: string, next: string): Promise<any> {
    const url =next || `${TRACKS_ENDPOINT + id}/tracks?fields=items(track.artists),next,total&&limit=30&&offset=0`
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
  },
};

export default appService;
