import { createWikiProfile } from "api/user";
import { IcreateWikiProfileBody } from "api/user/types";
import { useNavigate } from "react-router-dom";


interface ArtistOption extends IcreateWikiProfileBody {
  isClaimed?: boolean;
  username?:string;
}

const useHandleArtistSelected = () => {
  const navigate = useNavigate();

  const handleArtistSelected = async (option: ArtistOption) => {
    const { spotifyId, professionalName, isClaimed, popularity, thumbnail, tag,
      followers, username
    } = option;


    console.log("option here", option);
    if (isClaimed === true) {
      navigate(`/artist-profile/${username}`);
    } else {
      const wikiProfile = await createWikiProfile({ 
        spotifyId,
        professionalName,
        popularity,
        thumbnail,
        tag,
        followers
      });
      navigate(`/wiki/${wikiProfile.data?.results?.spotify_id}`);
    }
  };
  return { handleArtistSelected };
};

export default useHandleArtistSelected;
