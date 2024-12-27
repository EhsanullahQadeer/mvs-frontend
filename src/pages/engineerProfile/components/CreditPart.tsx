import ScrollableContainer from "components/util/scrollable-container";
import cover from "../../../assets/img/cover.png";
import React, { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import sound from "../../../assets/icons/sound.svg";

const cardData = [
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
  {
    Name: "Dark Magic",
    About: "Nothing nowhere",
  },
];

const CreditPart = () => {
  const [cardStates, setCardStates] = useState(
    cardData.map(() => null)
  );

  const handleSelection = (index, value) => {
    const updatedStates = [...cardStates];
    updatedStates[index] = value; 
    setCardStates(updatedStates);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h2 className={`text-gainsBoro mb-3 text-base font-semibold`}>
            Credits
          </h2>
        </div>
        <ScrollableContainer
          {...{
            showScrollArrows: false,
          }}
        >
          <div className="flex gap-[12px] ">
            {cardData.map((value, index) => {
              const selectedValue = cardStates[index];
              const isMastering = selectedValue === "A";

              return (
                <div
                  key={index}
                  className="flex flex-col rounded-lg border bg-darkGray border-eclipseGray p-3 "
                >
                  <div
                    style={{
                      backgroundImage: `url(${cover})`,
                      backgroundSize: "cover",
                    }}
                    className="w-[150px] h-[150px] object-cover relative rounded-md"
                  >
                    <div
                      style={{ background: "rgba(28, 28, 28, 0.90)" }}
                      className="flex px-[8px]  text-[12px] w-fit rounded-br-lg py-1.5 items-center justify-center gap-1"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedValue === "A"
                            ? "bg-green"
                            : selectedValue === "B"
                            ? "bg-[#FF6224]"
                            : "bg-green"
                        }`}
                      ></span>
                      <span className="text-[#D7D7D7;]">
                        {selectedValue === "A"
                          ? "Mastering"
                          : selectedValue === "B"
                          ? "Mixing"
                          : "Mastering"}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IoPlayCircleOutline className="text-white text-[44px]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-white font-semibold text-sm">
                      {value.Name}
                    </h2>
                    <p className="text-coolGray text-xs">{value.About}</p>
                  </div>

                  <div className="flex items-center w-full gap-1 mt-2">
                    <button
                      className={`px-[16px] py-[4px] flex items-center justify-center w-1/2 border text-white border-charcoalGray rounded-md text-sm ${
                        selectedValue === "A" ? "bg-green" : "bg-gray-700"
                      }`}
                      onClick={() => handleSelection(index, "A")}
                    >
                      {selectedValue === "B" || selectedValue === null ? (
                        "A"
                      ) : (
                        <img src={sound} className="p-0.5" alt="Sound Icon" />
                      )}
                    </button>
                    <button
                      className={`px-[16px] py-[4px] flex items-center justify-center w-1/2 border text-white border-charcoalGray rounded-md text-sm ${
                        selectedValue === "B" ? "bg-green" : "bg-gray-700" // Default gray background
                      }`}
                      onClick={() => handleSelection(index, "B")}
                    >
                      {selectedValue === "A" || selectedValue === null ? (
                        "B"
                      ) : (
                        <img src={sound} className="p-0.5" alt="Sound Icon" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollableContainer>
      </div>
    </>
  );
};

export default CreditPart;
