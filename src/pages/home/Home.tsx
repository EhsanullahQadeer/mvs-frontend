import Theme from "theme";
import { SearchHeader } from "./components/SearchHeader";
import Filters from "./components/Filters";
import { useEffect, useState } from "react";
import ScrollableComponent from "./components/ScrollableComponent";
import { artistData } from "./components/data";
import FilterResultComponent from "./components/FilterResultComponent";
import { userLabel, userTags } from "utils/usersTags";
import { getUsersByTag } from "api/user";

const Home = () => {
  const [filterValue, setFilterValue] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [musicProducerFilter, setMusicProducerFilter] = useState("");
  // Fetch users by tags with Promise.all
  const [usersByTag, setUsersByTag] = useState({});
  console.log("usersByTag: ", usersByTag);

  const fetchUsersByTags = async () => {
    const usersData = {};
    // Run all promises concurrently
    const results = await Promise.all(
      userTags.map(async (tag) => {
        const users = await getUsersByTag({ tag });
        return { tag, users: users.data }; 
      })
    );

    // Sort and assign the results based on the order of userTags
    userTags.forEach((tag) => {
      const result = results.find((res) => res.tag === tag); 
      if (result) {
        usersData[tag] = result.users;
      }
    });

    setUsersByTag(usersData);
  };

  useEffect(() => {
    fetchUsersByTags();
  }, []);
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
          {/* <ScrollableComponent
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
          /> */}
        </>
      )}
      {Object.entries(usersByTag).map(([key, value]) => (
        <ScrollableComponent
          key={key}
          filterValue={musicProducerFilter}
          setFilterValue={setMusicProducerFilter}
          filtersArr={artistData.filtersArr}
          dataArr={value}
          title={userLabel[key]}
        />
      ))}
    </Theme>
  );
};

export default Home;
