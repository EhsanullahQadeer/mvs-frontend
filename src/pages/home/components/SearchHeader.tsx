import banner from "../../../assets/img/welcome-banner.svg";
import leftWing from "../../../assets/img/left wing.svg";
import rightWing from "../../../assets/img/right wing.svg";
import frquesncyIcon from "../../../assets/img/frequency-Icon.svg";
import crownIcon from "../../../assets/icons/crownIcon.svg";
import "../styles/search-header.scss";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../../assets/icons/searchIcon.svg";

export interface IAppProps {}

export function SearchHeader(props: IAppProps) {
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
            <div>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="search producers, songwriters and more..."
                    sx={{
                      background: "#1C1C1C",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
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
                        padding: "0 !important",
                        boxShadow: "none",
                        height: "19px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      style: {
                        padding: "10px 24px",
                        border: "none",
                        color: "rgba(76, 76, 76, 1)",
                      },
                    }}
                    // slotProps={{
                    //   input: {
                    //     ...params.InputProps,
                    //     type: "search",
                    //   },
                    // }}
                  />
                )}
              />
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
