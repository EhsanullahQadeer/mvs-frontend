import { storeSpotifyArtist } from "api/user";
import { IstoreSpotifyArtistBody } from "api/user/types";
import { useNavigate } from "react-router-dom";


interface ArtistOption extends IstoreSpotifyArtistBody {
  is_claimed?: boolean;
  username?:string;
}
const useHandleArtistSelected = () => {
  const navigate = useNavigate();

  const handleArtistSelected = async (option: ArtistOption) => {
    const { spotify_artist_id, professional_name, is_claimed, popularity, thumbnail, tag,
      followers, username
    } = option;

    if (is_claimed === true) {
      navigate(`/artist-profile/${username}`);
    } else {
      await storeSpotifyArtist({ spotify_artist_id, professional_name, popularity, thumbnail, tag, followers });
      navigate(`/artist-wiki-profile/${spotify_artist_id}`);
    }
  };

  return { handleArtistSelected };
};

export default useHandleArtistSelected;
