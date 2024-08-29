import Theme from "theme";
import { SearchHeader } from "./components/SearchHeader";
import Filters from "./components/Filters";
import { useState } from "react";
import ScrollableComponent from "./components/ScrollableComponent";
import { artistData } from "./components/data";
import FilterResultComponent from "./components/FilterResultComponent";
import "./styles/home.scss";

const Home = () => {
  const [filterValue, setFilterValue] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [musicProducerFilter, setMusicProducerFilter] = useState("");

  return (
    <Theme>
      <SearchHeader />
      <Filters {...{ filterValue, setFilterValue }} />
      {filterValue !== "" ? (
        <>
          <FilterResultComponent />
        </>
      ) : (
        <>
          <ScrollableComponent
            {...{
              filterValue: artistFilter,
              setFilterValue: setArtistFilter,
              filtersArr: artistData.filtersArr,
              dataArr: artistData.artistsArr,
              title: "Artists",
            }}
          />

          <ScrollableComponent
            {...{
              filterValue: musicProducerFilter,
              setFilterValue: setMusicProducerFilter,
              filtersArr: artistData.filtersArr,
              dataArr: artistData.artistsArr,
              title: "Music Producers",
            }}
          />
        </>
      )}
    </Theme>
  );
};

export default Home;
