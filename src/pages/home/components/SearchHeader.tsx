import { useState } from "react";
import banner from "../../../assets/img/welcome-banner.svg";
import leftWing from "../../../assets/img/left wing.svg";
import rightWing from "../../../assets/img/right wing.svg";
import frquesncyIcon from "../../../assets/img/frequency-Icon.svg";
import crownIcon from "../../../assets/icons/crownIcon.svg";
import "../styles/search-header.scss";
import { Autocomplete, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../../assets/icons/searchIcon.svg";
import { MdCancel } from "react-icons/md";
import artistImg from "../../../assets/img/artistImg.png";
import Popper from "@mui/material/Popper";

export interface IAppProps {}

const topResults = [
  { label: "Marshmello", category: "Artists", imgSrc: artistImg },
  { label: "Max Martin", category: "Producers", imgSrc: artistImg },
  { label: "Bad Bunny", category: "Songwriters", imgSrc: artistImg },
  { label: "Sylvia Massy", category: "Engineers", imgSrc: artistImg },
  { label: "Hit Boy", category: "Artists", imgSrc: artistImg },
  { label: "Subelo Neo", category: "Producers", imgSrc: artistImg },
];

function CustomPopper(props) {
  return (
    <Popper
      {...props}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ]}
    />
  );
}

export function SearchHeader(props: IAppProps) {
  const [searchValue, setSearchValue] = useState<any>(null);

  const handleCancelBtn = () => {
    setSearchValue(null);
  };

  return (
    <div className="search-header-wrap w-full relative">
      <img src={banner} alt="banner" className="h-full w-full banner" />
      <div className="serach-wrap  absolute left-1/2 top-0  transform -translate-x-1/2">
        <div className="flex h-full search-box gap-1">
          <div className="flex items-end ">
            <img className="wing-img h-auto" src={leftWing} alt="left-wing" />
          </div>
          <div className="flex-1 flex flex-col  justify-end pb-3 gap-5">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  className="absolute left-[-22px] top-1/2 transform -translate-y-1/2"
                  src={frquesncyIcon}
                  alt="frquesncy-icon"
                />
                <div className="text-center">
                  <h1 className="text-[32px] text-gainsboro font-semibold leading-[38px] tracking-[-0.64px] relative">
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
              </div>
            </div>
            <div className="relative">
              <Autocomplete
                freeSolo
                value={searchValue}
                onChange={(event, newValue) => setSearchValue(newValue)}
                options={topResults}
                PopperComponent={CustomPopper}
                groupBy={() => "Top Results"}
                ListboxProps={{
                  sx: {
                    background: "#1C1C1C",
                    padding: "12px",
                    paddingTop: "20px",
                  },
                }}
                renderGroup={(params) => (
                  <li key={params.key}>
                    <div className="mb-5">
                      <span className="text-white text-base font-semibold border-b-2 border-limeGreen pb-2">
                        Top Results
                      </span>

                      <div className="text-coolGray text-xs mt-5">
                        What are you looking for?
                      </div>
                    </div>
                    <ul>{params.children}</ul>
                  </li>
                )}
                renderOption={(props, option, { selected, index }) => (
                  <li
                    {...props}
                    className={`flex items-center gap-3 cursor-pointer p-2 mb-1 rounded-md hover:bg-[#0F0F0F] ${
                      props["aria-selected"] ? "bg-[#0F0F0F]" : ""
                    }`}
                  >
                    <img
                      src={option.imgSrc}
                      alt={option.label}
                      className="w-10 h-10 rounded-md"
                    />
                    <div className="flex gap-x-4 gap-y-1 flex-wrap items-center">
                      <span className="text-gainsboro text-sm">
                        {option.label}
                      </span>
                      <span className="text-charcoalGray text-xs">
                        From{" "}
                        <span className="text-coolGray">{option.category}</span>
                      </span>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="search producers, songwriters and more..."
                    sx={{
                      background: "#1C1C1C",
                      borderRadius: "8px",

                      "& .MuiOutlinedInput-root": {
                        paddingLeft: "35px",
                        paddingRight: "35px",
                        "& fieldset": {
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
                className="absolute right-[9px] top-1/2 -translate-y-1/2 text-[#4C4C4C] cursor-pointer"
                onClick={handleCancelBtn}
              >
                <MdCancel className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <img className="wing-img h-auto" src={rightWing} alt="left-wing" />
          </div>
        </div>
      </div>
    </div>
  );
}
