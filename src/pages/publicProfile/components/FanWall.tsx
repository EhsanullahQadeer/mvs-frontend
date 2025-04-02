import Comment from "./Comment";
import icon from "../../../assets/img/icon.svg";
import { CircularProgress } from "@mui/material";
import UnlockContentModel from "./UnlockContentModel";
import { IUserData } from "pages/profile/components/types";
import { IArtistProfileData, ICurrentUser } from "./types";
import { useEffect, useState, useRef, useCallback } from "react";
import { createFanwallPost, getFanwallPosts } from "api/fanwall";
import { useNotification } from "services/WebSocket/useNotification.hook";

interface IProps {
  artistData: IArtistProfileData | IUserData | null;
  currentUserInfo: ICurrentUser | null;
}

const LIMIT = 10;

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
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [viewingRepliesForPost, setViewingRepliesForPost] = useState<number | null>(null);

  useNotification('FANWALL_POST', (event) => {
    const newPost = event.post;
    if (newPost.parent || newPost.reply_to) {
      const parentId = newPost.parent?.id;
      setFanwallPostsData(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === parentId) {
            const updatedPost = {
              ...post,
              replies_count: (post.replies_count || 0) + 1,
              replies_list: viewingRepliesForPost === post.id
                ? [...(post.replies_list || []), { ...newPost, comment: newPost.post }]
                : post.replies_list
            };

            return updatedPost;
          }
          return post;
        });
      });
      return;
    }

    setFanwallPostsData(prevPosts => {
      newPost.comment = newPost.post;
      return [newPost, ...prevPosts];
    });
  });

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if ((entries[0].isIntersecting || entries[0].intersectionRatio > 0) && hasMore) {
          setIsLoadingMore(true);
          getFanwallPostsData(fanwallPostsData.length);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore, fanwallPostsData.length]
  );

  const getFanwallPostsData = async (skip: number = 0) => {
    try {
      if (skip === 0) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      const params = {
        fanwall_owner: id,
        skip: skip,
        take: LIMIT,
      };
      const response = await getFanwallPosts(params);
      console.log("response", response);
      setFanwallPostsData(prev => [...prev, ...response.data.results.posts]);
      setHasMore(response.data.results.hasMore);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
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

      const response = await createFanwallPost(body);
      const createdPost = response.data;

      if (postId) {
        setViewingRepliesForPost(replyToId || postId);
        
        setFanwallPostsData(prevPosts => 
          prevPosts.map(post => {
            if (post.id === (replyToId || postId)) {
              return {
                ...post,
                replies_count: (post.replies_count || 0) + 1,
                replies_list: [...(post.replies_list || []), { ...createdPost, comment: createdPost.post }]
              };
            }
            return post;
          })
        );
      } else {
        setFanwallPostsData(prevPosts => [{
          ...createdPost,
          comment: createdPost.post,
        }, ...prevPosts]);
      }

      handleCancel();
      setReplyText("");
      setReplyingTo(null);
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

  const handleShowReplies = (postId: number) => {
    console.log("Setting viewingRepliesForPost to:", postId);
    if (viewingRepliesForPost === postId) {
      setViewingRepliesForPost(null);
    } else {
      setViewingRepliesForPost(postId);
    }
  };

  const handleHideReplies = () => {
    console.log("Setting viewingRepliesForPost to null");
    setViewingRepliesForPost(null);
  };

  useEffect(() => {
    console.log("viewingRepliesForPost changed to:", viewingRepliesForPost);
  }, [viewingRepliesForPost]);

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

        <div className="overflow-y-auto h-[60vh] custom-dropdown"> {/* Set a fixed height and enable vertical scrolling */}
          {fanwallPostsData.map((fanwallPost, index) => (
            <div
              key={index}
              ref={index === fanwallPostsData.length - 1 ? lastPostElementRef : null}
            >
              <Comment
                {...{
                  fanwallPost,
                  replyingTo,
                  setReplyingTo,
                  replyText,
                  setReplyText,
                  handleSendReply: handleSend,
                  rootCommentId: fanwallPost.id,
                  handleShowReplies,
                  handleHideReplies,
                  viewingRepliesForPost,
                  allowReply: true,
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
      {isLoadingMore && (
        <div className="flex justify-center my-4">
          <CircularProgress
            size={40}
            sx={{
              color: "#9EFF00",
            }}
          />
        </div>
      )}
    </>
  );
};

export default FanWall;
