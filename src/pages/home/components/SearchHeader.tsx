/*****************************************************************************************
 * @file SearchHeader.tsx
 * @author Ehsanullah Qadeer
 * @desc Search header component.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 ****************************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */
import banner from "../../../assets/img/[M].svg";
import stars from "../../../assets/img/stars.svg";
import rightWing from "../../../assets/img/right wing.svg";
import frquesncyIcon from "../../../assets/img/frequency-Icon.svg";
import crownIcon from "../../../assets/icons/crownIcon.svg";
import "../styles/search-header.scss";
import { Autocomplete, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../../assets/icons/searchIcon.svg";
import { MdCancel } from "react-icons/md";
import CustomPopper from "./CutomPopperSearch";
import CircularProgress from "@mui/material/CircularProgress";
import useHandleArtistSelected from "../hooks/useHandleArtistSelected";
import { useSearchHeader } from "../hooks/useSearchHeader";
import { searchAllUsers, userArtistSearch } from "api/user";
import useDebounce from "hooks/useDebounce";
import { useState, useEffect } from "react";
import avatarImg from "../../../assets/img/avatar.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";
export interface IAppProps {}
const headerButtons = [
  "pop",
  "Dance/Electronic",
  "hiphop",
  "Reggaeton",
  "K-Pop",
  "R&B",
  "Rock",
  "Country",
];

export function SearchHeader() {
  const {
    topResults,
    searchInput,
    setSearchInput,
    loading,
    loadTopArtists,
    setLoading,
  } = useSearchHeader();
  const { handleArtistSelected } = useHandleArtistSelected();
  const [searchResults, setSearchResults] = useState([]);
  const [filterValue, setFilterValue] = useState<string>(""); // default value

  // Debounce the search value
  const debouncedSearchValue = useDebounce(searchInput, 300);

  const handleCancelBtn = () => {
    setSearchInput("");
  };
  const handleFilters = (value: string) => {
    setFilterValue(value);
  };

  const getUniqueResults = (data) => {
    //console.log('Incoming data:', data);
    return data;
  };

  useEffect(() => {
    (async () => {
      const response = await searchAllUsers("", 10, true, true);
      setSearchResults(response.data);
    })();
  }, []);

  useEffect(() => {
    if (debouncedSearchValue) {
      (async () => {
        try {
          setLoading(true);
          const response = await searchAllUsers(
            debouncedSearchValue,
            10,
            true,
            true
          );
          setSearchResults(getUniqueResults(response.data));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      (async () => {
        const response = await searchAllUsers("", 10, true, true);
        setSearchResults(getUniqueResults(response.data));
      })();
    }
  }, [debouncedSearchValue]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div
      className="search-header-wrap relative bg-no-repeat bg-cover  flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${stars})` }}
      // style={{backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className="search-wrap ">
        <div className="flex h-full search-box w-[450px] gap-1">
          {/* <div className="flex items-end ">
            <img className="wing-img h-auto" src={leftWing} alt="left-wing" />
          </div> */}
          <div className="flex-1 flex flex-col  justify-end pb-2 gap-5">
            <div id="title-and-description" className="flex justify-center">
              <div>
                <img src={banner} alt="" />
              </div>
              {/* <div className="relative">
                <img
                  className="absolute left-[-22px] top-1/2 transform -translate-y-1/2"
                  src={frquesncyIcon}
                  alt="frquesncy-icon"
                />
                <div className="text-center">
                  <h1 className="text-[32px] text-gainsboro font-semibold leading-[38px] 
                      tracking-[-0.64px] relative">
                    Welcome to MVSSIVE!
                    <img
                      className="absolute right-[15px] top-[-40px]"
                      src={crownIcon}
                      alt="frquesncy-icon"
                    />
                  </h1>
                  <p className="text-[14px] text-slateGray">
                    The ultimate hub for connecting with music industry
                    professionals.
                  </p>
                </div>
              </div> */}
            </div>
            <div id="search-input" className="relative">
              <Autocomplete
                inputValue={searchInput}
                freeSolo
                getOptionLabel={(option: any) => option.professionalName || ""}
                options={searchResults}
                PopperComponent={CustomPopper}
                groupBy={() => "Top Results"}
                ListboxProps={{
                  sx: {
                    padding: "0 15px",
                    scrollbarWidth: "none",
                  },
                }}
                renderGroup={(params) => (
                  <li key={params.key}>
                    <div className="pt-5 pb-5 sticky top-0 bg-eerieBlack">
                      <span className="text-white text-base font-semibold border-b-2 border-limeGreen pb-2">
                        Top Results
                      </span>

                      <div className="text-coolGray text-xs mt-5">
                        What are you looking for?
                      </div>
                    </div>
                    <ul>{params.children}</ul>
                    <div className="h-4 sticky bottom-0 bg-eerieBlack"></div>
                  </li>
                )}
                renderOption={(props, option: any) => {
                  // Create a truly unique key using spotify_artist_id and timestamp
                  const uniqueKey = `${option.professionalName}-${
                    option.spotify_artist_id || option.id
                  }-${Date.now()}`;

                  return (
                    <li
                      {...props}
                      key={uniqueKey}
                      className={`flex items-center gap-3 cursor-pointer p-2 mb-1 rounded-md hover:bg-jetBlack ${
                        props["aria-selected"] ? "bg-jetBlack" : ""
                      }`}
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleArtistSelected(option);
                      }}
                    >
                      <Thumbnail professionalName={option?.professional_name} thumbnail={option?.thumbnail} size="40" round={false}/>
                      <div className="flex items-center gap-3">
                        <span className="text-gainsboro text-sm w-32">
                          {option.professionalName}
                        </span>
                        <span className="text-charcoalGray text-xs ml-auto">
                          From{" "}
                          <span className="text-coolGray">
                            {option?.type || "Wiki"}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    onChange={handleSearchInput}
                    {...params}
                    placeholder="Search by Song, Producer, or Writer..."
                    sx={{
                      background: "#1C1C1C",
                      borderRadius: "40px",

                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "35px",
                        paddingRight: "35px",
                        "& fieldset": {
                          borderRadius: "40px", // <-- This makes the actual border rounded
                          borderColor: "rgba(104, 113, 126, 0.20)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(104, 113, 126, 0.50)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(104, 113, 126, 0.50)",
                        },
                      },
                      ".MuiInputBase-input": {
                        boxShadow: "none",
                        height: "19px",
                        color: "rgba(76, 76, 76, 1)",
                        padding: "10px 24px",
                      },
                    }}
                  />
                )}
              />

              <div className="absolute left-[9px] top-1/2 -translate-y-1/2">
                <SearchIcon />
              </div>
              <div
                className="bg-eerieBlack absolute right-[9px] top-1/2 -translate-y-1/2 text-[#4C4C4C] cursor-pointer"
                onClick={handleCancelBtn}
              >
                {loading ? (
                  <CircularProgress style={{ color: "#C4FF48" }} size={20} />
                ) : (
                  searchInput && <MdCancel className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>
          {/* <div className="flex items-end">
            <img className="wing-img h-auto" src={rightWing} alt="left-wing" />
          </div> */}
        </div>
      </div>
      <div className=" flex flex-col-reverse">
        <div className="  w-full flex flex-col justify-center items-center  ">
          <p className="text-sm font-normal text-dimGray">
            Discover producers, songwriters, artists, engineers by genre:
          </p>
        </div>

        <div className="flex w-full  py-3 mb-2 items-center justify-center flex-wrap gap-2">
          <div className="flex mx-auto gap-2 flex-wrap">
            {headerButtons.map((value, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleFilters(value)}
                  className={` cursor-pointer px-3 py-2 rounded-[35px] text-[12px] font-normal ${
                    filterValue === value
                      ? "bg-limeGreen border-limeGreen text-black"
                      : " text-charcoalGray"
                  }`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
