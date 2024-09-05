import React from 'react';

// Define a TypeScript interface for props
interface ProfileCardsProps {
  imageurl: string;
  title: string;
  singer: string;
  date: string;
  p1: string;
  p2: string;
  p3: string;
}

const ProfileCards: React.FC<ProfileCardsProps> = (props) => {
  return (
    <>
      <div
        style={{
          border: '1px solid #242424',
          background: '#131313',
        }}
        className=" rounded-md p-3"
      >
        <div className="flex   gap-3 items-center rounded-md">
          <div className='w-24 h-24 object-cover'>
          <img
            src={props.imageurl}
            alt="Side Effects Album Cover"
            className="w-full h-full object-cover rounded-md"
          />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-white font-medium">{props.title}</h2>
            <p className="text-lightGray text-sm">{props.singer}</p>
            <p className="text-coolGray text-xs">{props.date}</p>

            <div className="flex mt-1.5  gap-1.5">
              <button
                style={{
                  background: '#242424',
                  padding : "8px"

                }}
                className="text-white w-full text-xs flex  items-center justify-center  rounded-lg"
              >
                {props.p1}
              </button>
              <button
                style={{
                  background: '#242424',
                  padding : "8px"

                }}
                className="text-white w-full text-xs flex  items-center justify-center  rounded-lg"
              >
                {props.p1}
              </button>
              <button
                style={{
                  background: '#242424',
                  padding : "8px"

                }}
                className="text-white w-full text-xs flex  items-center justify-center  rounded-lg"
              >
                {props.p1}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
