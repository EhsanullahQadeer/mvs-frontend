import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import user from "../../../assets/img/artistImg.png";
import icon from "../../../assets/img/icon.svg";
import { createFanwallPost, getFanwallPosts } from "api/fanwall";
import { CircularProgress } from "@mui/material";

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
  const [isLoading, setLoading] = useState(true);
  const [fanwallPostsData, setFanwallPostsData] = useState([]);
  const [newPost, setNewPost] = useState("");

  const getFanwallPostsData = async () => {
    try {
      setLoading(true);
      const params = {
        fanwall_owner: 1, //fanwall owner id
        skip: 0,
        take: 10,
      };
      const response = await getFanwallPosts(params);
      setFanwallPostsData(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFanwallPostsData();
  }, []);

  const handleFanwallPostSend = async () => {
    if (!newPost.trim()) return;
    try {
      setLoading(true);
      const body = {
        post: newPost,
        main_post_id: 0, // post id
        reply_to_id: 0,
        fanwall_owner_id: 1, // fanwall owner id
      };

      await createFanwallPost(body);
      setNewPost("");
      await getFanwallPostsData();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line on Enter
      handleFanwallPostSend();
    }
  };

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="absolute w-full h-full z-50">
            <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center">
              <CircularProgress
                sx={{
                  width: "70px !important",
                  height: "70px !important",
                  color: "#9EFF00",
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-1 mb-5 relative">
          <textarea
            placeholder="Leave a comment"
            className="w-full resize-none h-[176px]  hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[16px] bg-jetBlack border border-eclipseGray text-silver rounded-lg"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyDown={handleKeyPress}
          ></textarea>
          <img className="absolute bottom-5 left-3" src={icon} alt="" />
        </div>
        <div>
          {fanwallPostsData.map((fanwallPost, index) => (
            <div className="border-b border-eerieBlack">
              <Comment key={index} {...{ fanwallPost }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FanWall;
