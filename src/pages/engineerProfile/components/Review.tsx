import React from "react";
import cover from "../../../assets/img/artistImg.png";
import { TiStar } from "react-icons/ti";

const reviews = [
  {
    id: 1,
    date: "24-09-2024",
    rating: 5,
    review:
      "Paris is an exceptional mastering engineer with a deep passion for music. His expertise ensures every track sounds polished and professional across all platforms.",
  },
  {
    id: 2,
    date: "15-08-2024",
    rating: 4,
    review:
      "Great experience working with Paris. His attention to detail is commendable!",
  },
  {
    id: 3,
    date: "15-08-2024",
    rating: 3,
    review:
      "Great experience working with Paris. His attention to detail is commendable!",
  },
];
const Review = () => {
  return (
    <>
      <div className=" ">
        <div className="flex items-center gap-0.5 px-10 text-white mb-4">
          {" "}
          <h2 className={`text-gainsBoro  text-base font-semibold`}>
            Reviews
          </h2>
          <span className="text-xs">({reviews.length})</span>
        </div>
        <div>
          {reviews.map((review) => (
            <div className="flex px-10 gap-8 py-8 border-b border-eclipseGray">
              <div className="flex gap-2 items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                  }}
                  className="flex rounded-full p-0.5 w-8 h-8 aspect-square"
                >
                  <img
                    alt=""
                    loading="lazy"
                    src={cover}
                    className="object-cover w-full h-full rounded-full border-[2px] border-[#151515]"
                  />
                </div>
                <div className="flex w-full flex-col gap-0.5">
                  <div className="text-xs whitespace-nowrap font-medium text-white">
                    Becky Hill
                  </div>
                  <div className="text-[10px] whitespace-nowrap flex text-silver gap-0.5">
                    <span>                    total seared 
                    </span>
                    <span className="text-white"> $200</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
              <div className="flex items-center text-xs">
                {[...Array(5)].map((_, i) => (
                  <TiStar

                    key={i}
                    className={
                        i < review.rating ? 'text-yellow-300' : 'text-white'
                    }
                  />
                ))}
                <span className="text-coolGray ml-1 text-[10px]">{review.date}</span>
              </div>
              <p className="text-coolGray block text-xs ">{review.review}</p>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Review;
