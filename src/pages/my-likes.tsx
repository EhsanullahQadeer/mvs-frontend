/*************************************************************************
 * @file my-likes.tsx
 * @author End Quote
 * @desc Page component for displaying user's liked items.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import PlayerContainer from "components/player/player-container";

const MyLikesPage = () => {
  return(
    <PlayerContainer source="likes"/>
  );
};

export default MyLikesPage;