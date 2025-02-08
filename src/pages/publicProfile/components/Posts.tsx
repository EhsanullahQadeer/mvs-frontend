import EachPost from "./EachPost";
import imageVideo from "../../../assets/img/video.png"
import user from "../../../assets/img/artistImg.png"
const posts = [
  {
    username: "DannyBoyStyles",
    handle: "dannyboy",
    profileImg: user, 
    videoThumbnail:imageVideo,
    price: "$160.00",
    title:
      "Discover pro-level techniques to achieve a clean, balanced mix and take your production to the next level 🚀✨",
    description:
      "Learn the secrets behind creating polished, professional mixes with tips straight from the studio. Perfect your sound and elevate your tracks!",
    likes: 158,
    comments: 56,
    isLocked: true,
 
  },
  {
    username: "MixMaster",
    handle: "mixmaster",
    profileImg: user, 
    videoThumbnail: imageVideo,
    price: "$99.99",
    title:
      "Master the art of sound design and create unique sonic landscapes! 🎧🔥",
    description:
      "Explore the fundamentals of sound synthesis and learn how to craft breathtaking audio textures.",
    likes: 245,
    comments: 89,
    isLocked: true,
 
  },
];

const Posts = () => {
  return (
    <>
    <div className="flex  w-full gap-5 text-white">
      <div   style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // Internet Explorer/Edge
  }} className="w-2/3 flex scrollbar-hide  flex-col gap-4 overflow-y-auto max-h-[80vh] pr-4">
      {posts.map((post, index) => (
        <EachPost key={index} {...post} />
      ))}      </div>
      <div className="w-1/3 flex">
vdsbsd
      </div>
    </div>
    </>
  );
};

export default Posts;
