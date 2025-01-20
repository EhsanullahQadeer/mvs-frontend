import { createWikiProfile } from "api/user";
import { IcreateWikiProfileBody } from "api/user/types";
import { useNavigate } from "react-router-dom";


interface ArtistOption extends IcreateWikiProfileBody {
  is_claimed?: boolean;
  username?:string;
}

const useHandleArtistSelected = () => {
  const navigate = useNavigate();

  const handleArtistSelected = async (option: ArtistOption) => {
    const { spotifyId, professionalName, is_claimed, popularity, thumbnail, tag,
      followers, username
    } = option;

    console.log('OPTIONS HERE', option);
    if (is_claimed === true && username !== undefined && username !== null) {
      navigate(`/profile/${username}`);
    } else if (is_claimed === undefined) {
      const wikiProfile = await createWikiProfile({ 
        spotifyId,
        professionalName,
        popularity,
        thumbnail,
        tag,
        followers
      });
      navigate(`/wiki/${wikiProfile.data?.results?.spotify_id}`);
    } else{
      navigate(`/wiki/${spotifyId}`);
    }
  };
  return { handleArtistSelected };

};


export default useHandleArtistSelected;
