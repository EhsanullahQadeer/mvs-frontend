/*************************************************************************
 * @file Home.tsx
 * @author Ehsanullah Qadeer
 * @desc Main component for managing and displaying user data on the
 *       homepage.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import Theme from "theme";
import { getUsersByTag } from "api/user";
import Filters from "./components/Filters";
import { UserFiltersDTO } from "api/user/types";
import { userTags, userTagsObj } from "utils/usersTags";
import { SearchHeader } from "./components/SearchHeader";
import ScrollableComponent from "./components/ScrollableComponent";
import FilterResultComponent from "./components/FilterResultComponent";

/* IMPORTS */
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setBreadcrumbs } from "redux/actions/breadcrumb.actions";

const Home = () => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [filtersData, setFiltersData] = useState([]);
  const [usersByTag, setUsersByTag] = useState<Record<string, any>>({});
  const [isFilterApplied, setIsFilterApplied] = useState("");

  // Set breadcrumbs (nav bar) for home page
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([{ name: "Home", path: "/" }]));
  }, [dispatch]);

  // Fetch users by tags with Promise.all
  const fetchUsersByTags = async () => {
    const usersData: Record<string, any> = {};

    // Run all promises concurrently
    const results = await Promise.all(
      userTags.map(async (tag) => {
        const users = await getUsersByTag({ primaryUserRole: tag }, 50);
        return {
          tag,
          users: users.data,
        };
      })
    );

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

  // Fetch filtered users based on filterValue change
  // Main tags under search bar
  useEffect(() => {
    const fetchFilteredUsers = async () => {
      if (filterValue) {
        const params: UserFiltersDTO = {
          primaryUserRole: filterValue,
          limit: 50,
        };
        const user = await getUsersByTag(params, 50);
        setFiltersData(user.data);
      } else {
        setFiltersData([]);
      }
    };

    fetchFilteredUsers();
  }, [filterValue]);
  // Reset filters when filterValue changes
  useEffect(() => {
    if (isFilterApplied !== "") {
      setFilterValue(isFilterApplied);
      setIsFilterApplied("");
    }
  }, [isFilterApplied]);

  return (
    <Theme>
      <SearchHeader />
      <Filters {...{ filterValue, setFilterValue }} />
      {filterValue !== "" || isFilterApplied !== "" ? (
        <FilterResultComponent 
          filtersData={filtersData} 
          setFilteredData={setFiltersData}
          initialData={filtersData}
          primaryUserRole={filterValue}
        />
      ) : (
        Object.entries(usersByTag).map(([key, value]) => (
          <ScrollableComponent
            key={key}
            primaryUserRole={key}
            dataArr={value}
            title={userTagsObj[key]}
            setUsersByTag={setUsersByTag}
            setIsFilterApplied={setIsFilterApplied}
          />
        ))
      )}
    </Theme>
  );
};

export default Home;
