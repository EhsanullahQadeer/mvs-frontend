import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import like from "../../../assets/img/heart.svg";
import comment from "../../../assets/img/comment.svg";
import download from "../../../assets/img/downloadicon.svg";

interface PostProps {
  username: string;
  handle: string;
  profileImg: string;
  videoThumbnail: string;
  price: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  isLocked?: boolean;
  
}

const EachPost: React.FC<PostProps> = ({
  username,
  handle,
  profileImg,
  videoThumbnail,
  price,
  title,
  description,
  likes,
  comments,
  isLocked = true,
 
}) => {
  const [locked, setLocked] = useState(isLocked);

  return (
    <div className="flex rounded-md w-full bg-eerieBlack p-2">
      <div className="p-4 w-full">
        <div className="flex items-center w-full justify-between">
          <div className="flex w-fit items-center gap-2">
            <div className="w-[52px] h-[52px] rounded-full">
              <img
                src={profileImg}
                alt={username}
                className="w-full rounded-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[18px] text-white font-semibold">
                  {username}
                </span>
                <MdVerified className="text-limeGreen" />
              </div>
              <span className="text-[14px] text-mediumGray">@{handle}</span>
            </div>
          </div>
          <IoEllipsisHorizontal className="text-white" />
        </div>

        <div className="relative w-full mt-5">
          {locked && (
            <div className="absolute top-2 left-2 p-[12px] bg-[#242424CC] rounded-lg flex  gap-2 items-center justify-center z-10">
              <SlLock className="text-white " />
              <button
                className="text-white text-[14px] rounded-md font-semibold bg-[#242424CC] "
                onClick={() => setLocked(false)}
              >
                Unlock Content
              </button>
            </div>
          )}
             {/* <video
        className={`w-full rounded-lg `}
        src="/assets/audio.mp3"
      ></video> */}

          <img
            src={videoThumbnail}
            alt="Video Thumbnail"
            className="w-full h-full"
          />
        </div>

        {locked && (
          <button
            className="my-5 py-[12px] px-4 text-black text-center font-semibold text-[14px] rounded-full w-full bg-limeGreen"
            onClick={() => setLocked(false)}
          >
            Unlock for {price}
          </button>
        )}

        <div className="font-semibold text-[20px] text-platinum">{title}</div>
        <div className="mt-3 text-mediumGray">{description}</div>

        {locked && (
          <div className="py-3 my-5 px-4 flex items-center gap-2 w-fit rounded-lg bg-[#0058AB33] text-[#0185FF]">
            <SlLock />
            <span>Pay to unlock the post</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="text-mediumGray flex gap-0.5 items-center">
              <img src={like} alt="Like" />
              <span>{likes}</span>
            </div>
            <div className="text-mediumGray flex gap-0.5 items-center">
              <img src={comment} alt="Comment" />
              <span>{comments}</span>
            </div>
            <div className="text-mediumGray flex gap-0.5 items-center">
              <img src={download} alt="Download" />
            </div>
          </div>
          <button className="bg-limeGreen px-5 text-black py-[12px] rounded-full">
            Send Tip
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachPost;
