import { storeSpotifyArtist } from "api/user";
import { useNavigate } from "react-router-dom";

type ArtistOption = {
  is_placeholder_account: boolean;
  name: string;
  id: string;
  popularity: number;
  thumbnail: string;
  type: "artist";
};

const useHandleArtistSelected = () => {
  const navigate = useNavigate();

  const handleArtistSelected = async (option: ArtistOption) => {
    const { is_placeholder_account, name, id, popularity, thumbnail, type } =
      option;

    if (is_placeholder_account !== false && !is_placeholder_account) {
      // API call
      const response = await storeSpotifyArtist(
        id,
        name,
        popularity,
        thumbnail,
        type
      );

      // Once the API call is done, navigate to the profile page
      navigate(`/artist-wiki-profile/${name}`);
    } else if (is_placeholder_account === true) {
      navigate(`/artist-wiki-profile/${name}`);
    } else {
      navigate(`/artist-profile/${name}`);
    }
  };

  return { handleArtistSelected };
};

export default useHandleArtistSelected;
