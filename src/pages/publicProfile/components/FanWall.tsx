import React from "react";
import Comment from "./Comment";
import user from "../../../assets/img/artistImg.png"


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
        <textarea
          rows={4}
          placeholder="Leave a comment"
          className="w-full resize-none mt-1  hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
          name=""
          id=""
        ></textarea>
            <div>
      {commentsData.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
      </div>
    </>
  );
};

export default FanWall;
