import ScrollableContainer from "components/util/scrollable-container";
import React, { useState } from "react";
import cover from "../../../assets/img/artistImg.png";

const classData = [
  {
    title: "Along The Way",
    description: "DEMA, London McNamara for",
  },
  { title: "Along The Way", description: "DEMA, London McNamara for" },
  { title: "Along The Way", description: "DEMA, London McNamara fore" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
  { title: "Along The Way", description: "DEMA, London McNamara" },
];

const Classes = () => {
  const [cardStates, setCardStates] = useState(
    classData.map(() => false)
  );

  const handleClick = (index) => {
    const updatedStates = [...cardStates];
    updatedStates[index] = !updatedStates[index]; 
    setCardStates(updatedStates);
  };

  return (
    <>
      <div>
        <div className="flex flex-col mb-3">
          <h2 className={`text-gainsBoro mb-1 text-base font-semibold`}>
            My Classes
          </h2>
          <span className="text-coolGray text-xs">Explore & discover courses to learn and grow your skills.</span>
        </div>
        <ScrollableContainer
          {...{
            showScrollArrows: false,
          }}
        >
          {classData.map((classItem, index) => (
            <div
              key={index}
              className="user-card-wraps cursor-grab carousel-inner px-1 flex transition-transform duration-1000 ease-linear"
            >
              <div
                style={{
                   background: `linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0) 3.28%,
                    rgba(0, 0, 0, 0.9) 72.01%,
                    #000 100%
                  ),
                  linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
                    url(${cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className={`border-[1px] rounded-lg w-[155px] h-[260px] relative group transition-all ease-in-out duration-500  border-eclipseGray`}
              >
                <div className="img-containerx w-[155px] h-[260px] rounded-lg">
                  <div className="absolute bottom-[12px] left-0 right-0 px-2 w-full ">
                    <span className="text-lg flex flex-col gap-[-2px] text-white justify-start whitespace-normal">
                      <span className="uppercase font-bold">Mastering</span>
                      <span className="text-sm  font-medium ">{classItem.title}</span>
                      <span className="text-[10px] mt-[-9px] text-coolGray line-clamp-1">
                        {classItem.description}
                      </span>
                      {cardStates[index] && (
                        <div className="w-full flex flex-col items-center">
                          <div className="text-[10px] w-full flex justify-between text-coolGray font-medium">
                            <span>Resume</span>
                            <span>2h33</span>
                          </div>
                          <div className="w-full bg-white h-0.5 rounded-full relative">
                            <div className="bg-silver w-2/5 h-0.5 rounded-full absolute"></div>
                          </div>
                        </div>
                      )}
                    </span>

                    <div className="max-h-0 overflow-hidden transition-all ease-in-out duration-500 group-hover:max-h-[85px] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                      <div className="text-xs font-normal text-white flex gap-0.5 items-center justify-center my-1">
                        <button
                          className="px-3 py-2 rounded-lg cursor-pointer text-xs font-normal 
            bg-limeGreen text-black"
                          onClick={() => handleClick(index)}
                        >
                          {cardStates[index] ? "Resume" : "View Class"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollableContainer>
      </div>
    </>
  );
};

export default Classes;
