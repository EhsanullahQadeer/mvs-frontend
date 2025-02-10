import React from "react";
import Comment from "./Comment";
import user from "../../../assets/img/artistImg.png"
import icon from '../../../assets/img/icon.svg'

const commentsData = [
  {
    profileImg: user,
    username: "John Doe",
    handle: "writer",
    time: "2h ago",
    content: "This is a sample comment!",
    likes: 12,
    comments: 3,
    replies: [
      {
        profileImg: user,
        username: "Mike Ross",
        handle: "singer",
        time: "1h ago",
        content: "I totally agree with this!",
        likes: 4,
        comments: 1,
      },
      {
        profileImg: user,
        username: "Mike Ross",
        handle: "singer",
        time: "1h ago",
        content: "I totally agree with this!",
        likes: 4,
        comments: 1,
      },
    ],
  },
  {
    profileImg: user,
    username: "Jane Smith",
    handle: "writer",
    time: "1h ago",
    content: "Great post! Thanks for sharing.",
    likes: 5,
    comments: 1,
    replies: [],
  },
];


const FanWall = () => {
  return (
    <>
      <div className="">
        <div className="my-5 relative">
        <textarea
          placeholder="Leave a comment"
          className="w-full resize-none h-[176px]  hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[16px] bg-jetBlack border border-eclipseGray text-[#B2B2B2] rounded-lg"
          name=""
          id=""
        ></textarea>
        <div className="bg-jetBlack  p-1">
        <img className="absolute bottom-5 left-3" src={icon} alt="" />

        </div>

        </div>
            <div>
      {commentsData.map((comment, index) => (
        <div className="border-b border-eerieBlack">        <Comment key={index} {...comment} />
</div>
      ))}
    </div>
      </div>
    </>
  );
};

export default FanWall;
