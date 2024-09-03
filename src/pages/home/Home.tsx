import Theme from "theme";
import { SearchHeader } from "./components/SearchHeader";
import Filters from "./components/Filters";
import { useEffect, useState } from "react";
import ScrollableComponent from "./components/ScrollableComponent";
import FilterResultComponent from "./components/FilterResultComponent";
import { userTags, userTagsObj } from "utils/usersTags";
import { getUsersByTag } from "api/user";

const Home = () => {
  const [filterValue, setFilterValue] = useState("");
  const [filtersData, setFiltersData] = useState([]);
  const [artistFilter, setArtistFilter] = useState("");
  // Fetch users by tags with Promise.all
  const [usersByTag, setUsersByTag] = useState({});
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
  useEffect(() => {
    if (filterValue) {
      const params = { tag: filterValue, limit: 50 };
      (async () => {
        const user = await getUsersByTag(params);
        setFiltersData(user.data);
      })();
    } else {
      setFiltersData([]);
    }
  }, [filterValue]);
  return (
    <Theme>
      <SearchHeader />
      <Filters {...{ filterValue, setFilterValue }} />
      {filterValue !== "" ? (
        <>
          <FilterResultComponent {...{ filtersData }} />
        </>
      ) : (
        Object.entries(usersByTag).map(([key, value]) => (
          <ScrollableComponent
            key={key}
            dataArr={value}
            title={userTagsObj[key]}
            setUsersByTag={setUsersByTag}
          />
        ))
      )}
    </Theme>
  );
};

export default Home;
