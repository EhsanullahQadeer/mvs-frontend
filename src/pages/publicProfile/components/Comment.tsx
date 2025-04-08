import { MdVerified } from "react-icons/md";
import icon from "../../../assets/img/icon.svg";
import React, { useEffect, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import commentIcon from "../../../assets/img/comment.svg";
import { getFanwallPostReplies, toggleFanwallPostLike } from "api/fanwall";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";

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
    replies_count: number;
    first_reply?: any;
    is_liked?: boolean;
  };
  replyingTo: number | null;
  setReplyingTo: (id: number | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleSendReply: (postId: number, replyToId: number) => void;
  rootCommentId: number;
  handleShowReplies: (postId: number) => void;
  handleHideReplies: () => void;
  viewingRepliesForPost: number | null;
  allowReply: boolean;
  onReplyAdded?: (reply: any) => void;
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

const Comment: React.FC<IProps> = ({
  fanwallPost,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  handleSendReply,
  rootCommentId,
  handleShowReplies,
  handleHideReplies,
  viewingRepliesForPost,
  allowReply,
  onReplyAdded,
}) => {
  const {
    id,
    comment,
    author,
    created_at,
    likes_count,
    replies_count,
    first_reply,
    is_liked,
  } = fanwallPost;

  const { professional_name, thumbnail } = author;
  const [totalLikes, setTotalLikes] = useState(likes_count);
  const [fanwallRepliesData, setFanwallRepliesData] = useState([]);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [isLiked, setIsLiked] = useState(is_liked);
  const [hasMoreReplies, setHasMoreReplies] = useState(false);
  const [isLoadingMoreReplies, setIsLoadingMoreReplies] = useState(false);

  const isShowingReplies = viewingRepliesForPost === id;

  const handleFanwallPostLike = async (e) => {
    e.stopPropagation();
    try {
      const body = {
        postId: id,
      };
      const response = await toggleFanwallPostLike(body);
      setTotalLikes(response.data.likes_count);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };

  useEffect(() => {
    if (isShowingReplies) {
      setFanwallRepliesData([]);
      setHasMoreReplies(false);
      setIsLoadingMoreReplies(false);
      getFanwallRepliesData();
    }
  }, [isShowingReplies]);

  const getFanwallRepliesData = async (loadMore: boolean = false) => {
    try {
      const skip = loadMore ? fanwallRepliesData.length : 0;
      
      const params = {
        post_id: id,
        skip: skip,
        take: 3,
      };
      
      const response = await getFanwallPostReplies(params);
      
      setFanwallRepliesData(prevData => 
        loadMore ? [...prevData, ...response.data] : response.data
      );
      
      setHasMoreReplies(response.data.length === 3);
      setIsLoadingMoreReplies(false);
    } catch (error) {
      console.log("Error fetching replies:", error);
      setIsLoadingMoreReplies(false);
    }
  };

  const handleCommentClick = () => {
    if (allowReply) {
      setReplyText("");
      setIsTextareaFocused(false);
      setReplyingTo(replyingTo === id ? null : id);
    }
  };

  const handleReplyCancel = () => {
    setReplyText("");
    setReplyingTo(null);
    setIsTextareaFocused(false);
  };

  const handleReplyLocally = (newReply: any) => {
    setFanwallRepliesData(prev => [...prev, newReply]);
  };

  return (
    <div className="w-full">
      <div
        onClick={handleCommentClick}
        className={`p-4 cursor-pointer hover:bg-eclipseGray transition-all duration-200 rounded border-b border-eerieBlack ${
          id !== rootCommentId ? "ml-14" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thumbnail professionalName={professional_name} thumbnail={thumbnail} size="52"/>
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
          <div className="text-mediumGray flex gap-1 items-center">
            <div onClick={handleFanwallPostLike} className="cursor-pointer">
              {isLiked ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18.25C9.86739 18.2501 9.73779 18.2122 9.625 18.14C6.58 16.47 4.292 14.588 2.813 12.574C1.076 10.21 0.75 8.056 0.75 6.5C0.750744 5.11915 1.30316 3.79459 2.28441 2.81334C3.26566 1.83209 4.59022 1.27967 5.97107 1.27893C7.60961 1.27799 9.15073 2.04642 10 3.33893C10.8493 2.04642 12.3904 1.27799 14.0289 1.27893C15.4098 1.27967 16.7343 1.83209 17.7156 2.81334C18.6968 3.79459 19.2493 5.11915 19.25 6.5C19.25 8.056 18.924 10.21 17.188 12.574C15.708 14.588 13.42 16.47 10.375 18.14C10.2622 18.2122 10.1326 18.2501 10 18.25Z" fill="#FF4033"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18.25C9.86739 18.2501 9.73779 18.2122 9.625 18.14C6.58 16.47 4.292 14.588 2.813 12.574C1.076 10.21 0.75 8.056 0.75 6.5C0.750744 5.11915 1.30316 3.79459 2.28441 2.81334C3.26566 1.83209 4.59022 1.27967 5.97107 1.27893C7.60961 1.27799 9.15073 2.04642 10 3.33893C10.8493 2.04642 12.3904 1.27799 14.0289 1.27893C15.4098 1.27967 16.7343 1.83209 17.7156 2.81334C18.6968 3.79459 19.2493 5.11915 19.25 6.5C19.25 8.056 18.924 10.21 17.188 12.574C15.708 14.588 13.42 16.47 10.375 18.14C10.2622 18.2122 10.1326 18.2501 10 18.25ZM5.97107 2.52893C4.93861 2.52976 3.94877 2.94022 3.21387 3.67512C2.47897 4.41002 2.06851 5.39986 2.06768 6.43232C2.06768 7.77332 2.34068 9.61032 3.88168 11.709C5.24068 13.559 7.35368 15.302 10.001 16.846C12.649 15.302 14.761 13.559 16.12 11.709C17.661 9.61032 17.934 7.77332 17.934 6.43232C17.9332 5.39986 17.5227 4.41002 16.7878 3.67512C16.0529 2.94022 15.0631 2.52976 14.0306 2.52893C12.7579 2.52851 11.5602 3.11697 10.813 4.13032C10.7187 4.25862 10.5905 4.35961 10.4427 4.42312C10.2948 4.48664 10.1328 4.51033 9.97268 4.49165C9.81257 4.47297 9.66089 4.41268 9.53501 4.31697C9.40912 4.22126 9.31395 4.09366 9.25868 3.94832C8.51138 2.93497 7.31372 2.34651 6.04107 2.34693L5.97107 2.52893Z" fill="#848484"/>
                </svg>
              )}
            </div>
            <span>{totalLikes}</span>
          </div>
          {allowReply && (
            <div className="text-mediumGray flex gap-1 items-center">
              <img src={commentIcon} alt="Comment" className="w-5 h-5" />
              <span>{fanwallRepliesData.length}</span>
            </div>
          )}
        </div>

        {replyingTo === id && (
          <div className="mt-3 relative" onClick={(e) => e.stopPropagation()}>
            <textarea
              placeholder="Write a reply..."
              className="w-full resize-none h-[140px] hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[16px] bg-jetBlack border border-eclipseGray text-silver rounded-lg"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onFocus={() => setIsTextareaFocused(true)}
            ></textarea>

            <div className="w-full absolute bottom-5 flex justify-between items-center px-3">
              <img src={icon} alt="" />

              {isTextareaFocused && (
                <div className="flex items-center gap-2">
                  <div
                    onClick={handleReplyCancel}
                    className="w-full px-4 py-2 bg-transparent text-silver border border-silver rounded-full text-sm font-semibold cursor-pointer"
                  >
                    Cancel
                  </div>
                    <div
                      onClick={() => handleSendReply(id, rootCommentId)} // Pass rootCommentId
                      className="w-full px-3 py-2 bg-limeGreen text-[#203300] rounded-full text-sm font-semibold cursor-pointer"
                    >
                      Comment
                    </div>
                </div>
              )}
            </div>
          </div>
        )}

        {allowReply &&
          replies_count > 0 && (
            <div
              className="my-4 text-[14px] text-dimGray flex items-center gap-0.5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (isShowingReplies) {
                  handleHideReplies();
                } else {
                  handleShowReplies(id);
                }
              }}
            >
              <span className="bg-dimGray w-12 h-[1px]"></span>
              {isShowingReplies
                ? "Hide replies"
                : `See replies (${replies_count})`}
            </div>
          )}
      </div>

      {first_reply && (
        <div className="mt-4 pl-8 relative">
          <div className="absolute top-0 bottom-0 w-[4px] bg-eclipseGray"></div>
          <Comment
            {...{
              fanwallPost: first_reply,
              replyingTo,
              setReplyingTo,
              replyText,
              setReplyText,
              handleSendReply,
              rootCommentId: rootCommentId,
              handleShowReplies,
              handleHideReplies,
              viewingRepliesForPost,
              allowReply: false,
              onReplyAdded: handleReplyLocally,
            }}
          />
        </div>
      )}

      {fanwallRepliesData.length > 0 && isShowingReplies && (
        <div className="mt-4 pl-8 relative">
          <div className="absolute top-0 bottom-0 w-[4px] h-[95%] bg-eclipseGray"></div>
          {(first_reply
            ? fanwallRepliesData.filter((reply) => reply.id !== first_reply.id)
            : fanwallRepliesData
          ).map((reply) => (
            <Comment
              key={reply.id}
              {...{
                fanwallPost: reply,
                replyingTo,
                setReplyingTo,
                replyText,
                setReplyText,
                handleSendReply,
                rootCommentId: rootCommentId,
                handleShowReplies,
                handleHideReplies,
                viewingRepliesForPost,
                allowReply: false,
                onReplyAdded: handleReplyLocally,
              }}
            />
          ))}
          {hasMoreReplies && (
            <div 
              className="mt-4 text-center text-dimGray text-sm cursor-pointer hover:text-silver"
              onClick={(e) => {
                e.stopPropagation();
                getFanwallRepliesData(true);
              }}
            >
              {isLoadingMoreReplies ? "Loading..." : "See more replies"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
