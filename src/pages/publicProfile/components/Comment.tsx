import React, { useState } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { MdVerified } from 'react-icons/md';
import likeIcon from "../../../assets/img/heart.svg";
import commentIcon from "../../../assets/img/comment.svg";

interface ReplyProps {
  profileImg: string;
  username: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

interface CommentProps extends ReplyProps {
  replies?: ReplyProps[];
}

const Comment: React.FC<CommentProps> = ({ profileImg, username, handle, time, content, likes, comments, replies = [] }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="p-4 w-full border-b border-gray-700">
      <div className="flex items-center w-full justify-between">
        <div className="flex w-fit items-center gap-2">
          <div className="w-[52px] h-[52px] rounded-full ">
            <img src={profileImg} alt={username} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[18px] text-white font-semibold">{username}</span>
              <MdVerified className="text-limeGreen" />
            </div>
            <span className="text-[12px] text-mediumGray">Artist · {handle} | Warner Chappel · polydar</span>
            <span className="text-[12px] text-mediumGray">{time}</span>
          </div>
        </div>
        <IoEllipsisHorizontal className="text-white cursor-pointer" />
      </div>
      <div className="mt-2 text-[15px] text-white">{content}</div>
      <div className="flex items-center gap-4 mt-3">
        <div className="text-mediumGray flex gap-0.5 items-center">
          <img src={likeIcon} alt="Like" className="w-5 h-5" />
          <span>{likes}</span>
        </div>
        <div className="text-mediumGray flex gap-0.5 items-center">
          <img src={commentIcon} alt="Comment" className="w-5 h-5" />
          <span>{comments}</span>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="my-4 text-[14px] text-mediumGray flex items-center gap-0.5 cursor-pointer" onClick={() => setShowReplies(!showReplies)}>
          <span className='bg-mediumGray w-12 h-[1px]'></span>
          {showReplies ? "Hide replies" : `See replies (${replies.length})`}
        </div>
      )}
      {showReplies && replies.map((reply, index) => (
        <div key={index} className="  border-l border-gray-700">
          <Comment {...reply} replies={[]} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
