import React, { useEffect, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import likeIcon from "../../../assets/img/heart.svg";
import commentIcon from "../../../assets/img/comment.svg";
import { getFanwallPostReplies, toggleFanwallPostLike } from "api/fanwall";

interface IProps {
  fanwallPost: {
    id: number;
    comment: string;
    author: {
      professional_name: string;
      thumbnail: string;
    };
    created_at: string;
    likes_count: number;
  };
}

const getRelativeTime = (timestamp: string) => {
  const now: any = new Date();
  const time: any = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diffInSeconds < 60) return "just now";
  if (minutes < 60) return `${minutes}min ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  return `${days} days ago`;
};

const Comment: React.FC<IProps> = ({ fanwallPost }) => {
  const { id, comment, author, created_at, likes_count } = fanwallPost;
  const { professional_name, thumbnail } = author;
  const [showReplies, setShowReplies] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes_count);
  const [fanwallRepliesData, setFanwallRepliesData] = useState([]);

  const handleFanwallPostLike = async () => {
    try {
      const body = {
        postId: id,
      };
      const response = await toggleFanwallPostLike(body);
      setTotalLikes(response.data.likes_count);
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };

  const getFanwallRepliesData = async () => {
    try {
      const params = {
        post_id: id,
        skip: 0,
        take: 10,
      };
      const response = await getFanwallPostReplies(params);
      setFanwallRepliesData(response.data);
    } catch (error) {
      console.log("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    getFanwallRepliesData();
  }, [id]);

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
            <img
              src={thumbnail}
              alt={professional_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[18px] text-white font-semibold">
                {professional_name}
              </span>
              <MdVerified className="text-limeGreen" />
            </div>
            <span className="text-[12px] text-mediumGray">
              {getRelativeTime(created_at)}
            </span>
          </div>
        </div>
        <IoEllipsisHorizontal className="text-white cursor-pointer" />
      </div>

      <div className="mt-2 text-[16px] text-[#ccc]">{comment}</div>
      <div className="flex items-center gap-4 mt-3">
        <div className="text-mediumGray flex gap-0.5 items-center">
          <div onClick={handleFanwallPostLike} className="cursor-pointer">
            <img src={likeIcon} alt="Like" className="w-5 h-5" />
          </div>
          <span>{totalLikes}</span>
        </div>
        <div className="text-mediumGray flex gap-0.5 items-center">
          <img src={commentIcon} alt="Comment" className="w-5 h-5" />
          <span>{fanwallRepliesData.length}</span>
        </div>
      </div>

      {fanwallRepliesData.length > 0 && (
        <div
          className="my-4 text-[14px] text-dimGray flex items-center gap-0.5 cursor-pointer"
          onClick={() => setShowReplies(!showReplies)}
        >
          <span className="bg-dimGray w-12 h-[1px]"></span>
          {showReplies
            ? "Hide replies"
            : `See replies (${fanwallRepliesData.length})`}
        </div>
      )}

      {fanwallRepliesData.length > 0 && showReplies && (
        <div className="ml-10 mt-4">
          {fanwallRepliesData.map((reply) => (
            <Comment key={reply.id} fanwallPost={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
