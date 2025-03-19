import { useEffect, useState } from "react";
import Comment from "./Comment";
import icon from "../../../assets/img/icon.svg";
import { createFanwallPost, getFanwallPosts } from "api/fanwall";
import { CircularProgress } from "@mui/material";
import { IArtistProfileData, ICurrentUser } from "./types";
import UnlockContentModel from "./UnlockContentModel";
import { IUserData } from "pages/profile/components/types";

interface IProps {
  artistData: IArtistProfileData | IUserData | null;
  currentUserInfo: ICurrentUser | null;
}

const FanWall = (props: IProps) => {
  const { artistData, currentUserInfo } = props;
  const { id } = artistData || {};
  const [isLoading, setLoading] = useState(true);
  const [fanwallPostsData, setFanwallPostsData] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [openUnlockModal, setOpenUnlockModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const getFanwallPostsData = async () => {
    try {
      setLoading(true);
      const params = {
        fanwall_owner: id,
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

  const handleFanwallPostSend = async (postId?: number, replyToId?: number) => {
    if (postId) {
      if (!replyText.trim()) return;
    } else {
      if (!newPost.trim()) return;
    }

    try {
      setLoading(true);
      const body = {
        post: postId ? replyText : newPost,
        ...(postId && { main_post_id: replyToId || postId }),
        ...(postId && { reply_to_id: postId }),
        fanwall_owner_id: id,
      };

      await createFanwallPost(body);
      handleCancel();
      setReplyText("");
      setReplyingTo(null);
      await getFanwallPostsData();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (postId?: number, replyToId?: number) => {
    if (currentUserInfo) {
      handleFanwallPostSend(postId, replyToId);
    } else {
      setOpenUnlockModal(true);
    }
  };

  const handleTextareaFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setNewPost("");
    setIsFocused(false);
  };

  useEffect(() => {
    console.log("post comment data...", fanwallPostsData);
  }, [fanwallPostsData]);

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
            onFocus={handleTextareaFocus}
          ></textarea>
          <div className="w-full absolute bottom-5 flex justify-between items-center px-3">
            <img src={icon} alt="" />

            {isFocused && (
              <>
                <div className="flex items-center gap-2">
                  <div
                    onClick={handleCancel}
                    className="w-full px-4 py-2 bg-transparent text-silver border border-silver rounded-full text-sm font-semibold cursor-pointer"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => handleSend()}
                    className="w-full px-3 py-2 bg-limeGreen text-[#203300] rounded-full text-sm font-semibold cursor-pointer"
                  >
                    Comment
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          {!isLoading &&
            fanwallPostsData.map((fanwallPost, index) => (
              <div key={index}>
                <Comment
                  {...{
                    fanwallPost,
                    replyingTo,
                    setReplyingTo,
                    replyText,
                    setReplyText,
                    handleSendReply: handleSend,
                    rootCommentId: fanwallPost.id,
                  }}
                />
              </div>
            ))}
        </div>

        <UnlockContentModel
          open={openUnlockModal}
          onClose={() => setOpenUnlockModal(false)}
        />
      </div>
    </>
  );
};

export default FanWall;
