import { Modal, Slide, Box, CircularProgress, TextField } from "@mui/material";
import { MdKeyboardArrowLeft, MdCancel } from "react-icons/md";
import { useState, useEffect } from "react";
import useDebounce from "hooks/useDebounce";
import { CiSearch } from "react-icons/ci";
import { PiLink } from "react-icons/pi";
import { IoCheckmarkCircle } from "react-icons/io5";
import SampleUpdatedModel from "./SampleUpdatedModel"; // Import the modal
import sampleimage from "../../../assets/img/artistImg.png";

const ShareModal = ({ open, onClose }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sampleModalOpen, setSampleModalOpen] = useState(false); // State to control SampleUpdatedModel

  const users = [
    { name: "Becky Hill", img: sampleimage },
    { name: "Poo Bear", img: sampleimage },
    { name: "Dua Lipa", img: sampleimage },
    { name: "Skrillex", img: sampleimage },
    { name: "Diplo", img: sampleimage },
    { name: "Marshmello", img: sampleimage },
    { name: "Dannyboy", img: "/avatars/danny.jpg" },
    { name: "Bad Bunny", img: "/avatars/badbunny.jpg" },
  ];

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (debouncedSearch) {
        setFilteredUsers(
          users.filter((user) =>
            user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        );
      } else {
        setFilteredUsers(users);
      }
      setLoading(false);
    }, 300);
  }, [debouncedSearch]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCancelBtn = () => {
    setSearchInput("");
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(user)
        ? prevSelected.filter((u) => u !== user)
        : [...prevSelected, user]
    );
  };

  const handleSend = () => {
    if (selectedUsers.length > 0) {
      setSampleModalOpen(true); // Open the SampleUpdatedModel
    }
  };

  return (
    <>
      <Modal sx={{ border: "1px solid #242424" }} open={open} onClose={onClose}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box className="fixed bottom-0 left-0 w-full border border-eclipseGray bg-darkGray text-white p-4 rounded-t-2xl shadow-lg h-[75vh] flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="text-left" onClick={onClose}>
                <MdKeyboardArrowLeft className="text-2xl text-white cursor-pointer" />
              </div>
              <h2 className="text-lg font-semibold">Share Sample</h2>
            </div>

            {/* Search Bar */}
            <div className="flex mt-3 items-center gap-2">
              <div className="flex items-center gap-2 w-full border border-eclipseGray bg-jetBlack rounded-lg px-3 py-2">
                <CiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInput}
                  placeholder="Search"
                  className="w-full bg-transparent text-white border-none !ring-0 focus:outline-none p-0"
                />

                {loading ? (
                  <CircularProgress style={{ color: "#C4FF48" }} size={14} />
                ) : (
                  searchInput && (
                    <span className="cursor-pointer" onClick={handleCancelBtn}>
                      <MdCancel />
                    </span>
                  )
                )}
              </div>
              <div className="p-3 border rounded-md border-eclipseGray ">
                <PiLink className="text-white cursor-pointer" />
              </div>
            </div>

            {/* User Grid */}
            {!searchInput && (
              <div className="grid grid-cols-4 gap-3 mt-4 p-2 flex-grow overflow-y-auto max-h-[200px]">
                {filteredUsers.map((user, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center cursor-pointer"
                    onClick={() => toggleUserSelection(user)}
                  >
                    <img
                      src={user.img}
                      alt={user.name}
                      className="w-[54px] h-[54px] rounded-full  transition-transform hover:scale-105 object-cover"
                    />
                    {selectedUsers.includes(user) && (
                      <IoCheckmarkCircle className="absolute bottom-[21px] right-[29px] text-[#0185FF] text-sm bg-white rounded-full" />
                    )}
                    <span className="text-[10px] mt-1">{user.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Search Results */}
            {searchInput && (
              <div className="mt-4 p-2 flex-grow overflow-y-auto max-h-[300px]">
                {loading ? (
                  <p className="text-gray-400 text-center">Searching...</p>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                      onClick={() => toggleUserSelection(user)}
                    >
                      <img
                        src={user.img}
                        alt={user.name}
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-white text-[12px] font-medium">
                          {user.name}
                        </span>
                        <span className="text-dimGray text-[10px]">
                          Executive Producer / Mixing Engineer
                        </span>
                      </div>
                      {selectedUsers.includes(user) && (
                        <IoCheckmarkCircle className="text-[rgb(1,133,255)] text-lg ml-auto" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No results found</p>
                )}
              </div>
            )}

            {selectedUsers.length > 0 && (
              <div className="px-2 pt-2">
                <textarea
                  placeholder="Add a message (optional)"
                  rows={2}
                  className="w-full resize-none bg-[#0F0F0F] !ring-0 text-[#848484] border border-[#242424] rounded-lg p-2 focus:outline-none"
                ></textarea>
               
                <button
                  className="w-full bg-limeGreen text-black font-semibold py-2 mt-3 rounded-full"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            )}
          </Box>
        </Slide>
      </Modal>

      <SampleUpdatedModel
        open={sampleModalOpen}
        handleClose={() => setSampleModalOpen(false)}
        message="Sample sent!"
      />
    </>
  );
};

export default ShareModal;
