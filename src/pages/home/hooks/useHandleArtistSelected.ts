import { storeSpotifyArtist } from "api/user";
import { IstoreSpotifyArtistBody } from "api/user/types";
import { useNavigate } from "react-router-dom";


interface ArtistOption extends IstoreSpotifyArtistBody {

  is_placeholder_account?: boolean;
  username?:string;
}
const useHandleArtistSelected = () => {
  const navigate = useNavigate();

  const handleArtistSelected = async (option: ArtistOption) => {
    const { spotify_artist_id, artist_name, is_placeholder_account, popularity, thumbnail, tag,
      followers,username
    } =
      option;
    if (is_placeholder_account !== false && !is_placeholder_account) {
      // API call
      await storeSpotifyArtist({ spotify_artist_id, artist_name, popularity, thumbnail, tag, followers });

      // Once the API call is done, navigate to the profile page
      navigate(`/artist-wiki-profile/${spotify_artist_id}`);
    } else if (is_placeholder_account === true) {
      navigate(`/artist-wiki-profile/${spotify_artist_id}`);
    } else {
      navigate(`/artist-profile/${username}`);
    }
  };

  return { handleArtistSelected };
};

export default useHandleArtistSelected;
