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
        className="min-w-80 mx-1  p-4"
      >
        <div className="flex w-24 h-24 gap-3 items-start rounded-md">
          <img
            src={props.imageurl}
            alt="Side Effects Album Cover"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="">
            <h2 className="text-white font-medium">{props.title}</h2>
            <p className="text-lightGray text-sm">{props.singer}</p>
            <p className="text-coolGray text-xs">{props.date}</p>

            <div className="flex mt-3  gap-1">
              <button
                style={{
                  background: '#242424',
                }}
                className="text-white text-xs p-1  rounded-md"
              >
                {props.p1}
              </button>
              <button
                style={{
                  background: '#242424',
                }}
                className="text-white w-full text-xs p-1 rounded-md"
              >
                {props.p2}
              </button>
              <button
                style={{
                  background: '#242424',
                }}
                className="text-white text-xs p-1 rounded-md"
              >
                {props.p3}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
