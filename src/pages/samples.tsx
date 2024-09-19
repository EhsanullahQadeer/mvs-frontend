/*************************************************************************
 * @file samples.ts
 * @author End Quote
 * @desc Page for displaying sample tracks in a player container.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import PlayerContainer from "../components/player/player-container";

const SamplesPage = () => {
  return (
    <PlayerContainer source="samples" />
  );
};

export default SamplesPage;