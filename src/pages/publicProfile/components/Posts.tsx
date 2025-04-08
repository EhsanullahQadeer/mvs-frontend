import EachPost from "./EachPost";
import imageVideo from "../../../assets/img/video.png";
import user from "../../../assets/img/artistImg.png";
import MessagingSection from "./MessagingSection";
import avatarImg from "../../../assets/img/avatar.svg";
import { ReactComponent as MusicIcon } from "../../../assets/icons/musicIcon.svg";
import musicBeam from "../../../assets/icons/musicBeam.svg";
import playIcon from "../../../assets/icons/playIcon.svg";
import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { formatMediaDetails } from "pages/Inbox/handlers/mediaUtils";

const posts = [
  {
    username: "DannyBoyStyles",
    handle: "dannyboy",
    profileImg: user,
    videoThumbnail: imageVideo,
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

const artist = {
  id: 2,
  thumbnail: avatarImg,
  professional_name: "john",
  country: "USA",
  region: "Miami",
};

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const Posts = ({ isPublicProfile }: { isPublicProfile: boolean }) => {
  const [artistData, setArtistData] = useState<any>(artist);
  const [uploadingFile, setUploadingFile] = useState<any>(null);
  const [mediaDetails, setMediaDetails] = useState<any>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateFile = (file: File) => {
    setErrorMessage("");

    if (!file.type.startsWith("audio/")) {
      setErrorMessage(`"${file.name}" is not an audio file.`);
      return null;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`"${file.name}" exceeds the 50MB limit.`);
      return null;
    }

    return file;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const droppedFile = e.dataTransfer.files[0];
    const validFile = validateFile(droppedFile);

    if (validFile) {
      setUploadingFile(validFile);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const validFile = selectedFile ? validateFile(selectedFile) : null;
    if (validFile) {
      setUploadingFile(validFile);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (uploadingFile) {
      const details = formatMediaDetails(
        uploadingFile?.duration,
        uploadingFile?.size
      );
      setMediaDetails(details);
    }
  }, [uploadingFile]);

  return (
    <>
      <div className="flex w-full gap-5 text-white">
        <div className="flex-[67%] flex flex-col gap-4">
          {posts.map((post, index) => (
            <EachPost key={index} {...post} />
          ))}
        </div>
        {isPublicProfile && (
          <div className="flex-[33%] flex flex-col">
            <div className="p-5 border border-eclipseGray rounded-t-xl border-b-0">
              <div className="flex gap-2.5 text-lg font-semibold text-white">
                {uploadingFile ? (
                <p>Demo Preview</p>
              ) : (
                <>
                  <MusicIcon className="w-8 h-8" />
                  <p>Ready to level up your music?</p>
                </>
              )}
            </div>

            <p className="mt-1.5 text-silver text-sm font-normal">
              {uploadingFile
                ? "Want feedback faster? Share your demo on the Fan Wall and get insights from the community right away!"
                : "Drop your demo and get direct feedback from Becky Hill! This is your chance to connect, improve, and take your tracks to the next level with expert advice."}
            </p>

            <div className="pt-4">
              {!uploadingFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex py-3.5 px-3 flex-col items-center justify-center w-full border-2 border-dashed border-charcoalGray rounded-lg"
                >
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center gap-[4px] cursor-pointer"
                  >
                    <div className="w-[37px] relative h-[48px] bg-mediumGray rounded-lg">
                      <span className="absolute border border-dimGray top-[23px] left-[18px] w-6 h-6 rounded-full flex justify-center items-center bg-eerieBlack">
                        <FiUploadCloud className="text-silver  text-sm" />
                      </span>
                    </div>
                    <div className=" flex items-center justify-center flex-col text-xs ">
                      <span className="text-[#C4E2FF] font-medium underline">
                        Click to upload
                      </span>
                      <span className="text-coolGray"> or drag and drop</span>
                    </div>
                    <p className="text-xs text-dimGray">
                      Maximum file size 50MB
                    </p>
                    <input
                      accept="audio/*"
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />

                    {errorMessage && (
                      <div className="mt-4 text-red-500 text-sm">
                        {errorMessage}
                      </div>
                    )}
                  </label>
                </div>
              ) : (
                <>
                  <div
                    className={`border overflow-hidden rounded-lg p-2.5 py-4 flex gap-3 items-center bg-[#1a1a1a] border-charcoalGray`}
                  >
                    <div className="relative w-8 h-8 cursor-pointer group border rounded-lg border-charcoalGray text-coolGray bg-jetBlack flex justify-center items-center">
                      <img
                        src={playIcon}
                        alt="Play"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 group-hover:opacity-0 transition-opacity duration-200">
                        <img src={musicBeam} alt="Music" className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <p className="font-normal text-sm text-silver flex">
                        <span className="line-clamp-1">
                          {uploadingFile?.name}
                        </span>
                      </p>

                      <div className="text-dimGray font-normal text-[10px]">
                        {mediaDetails?.size}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 w-full flex gap-2 items-center justify-end">
                    <div className="bg-transparent text-white border border-white py-1 px-3 rounded-full">
                      Submited
                    </div>

                    <div className="px-3 py-1.5 bg-limeGreen text-[#203300] rounded-full text-sm font-semibold cursor-pointer">
                      Send & Share on Fan Wall
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex-1">
            <MessagingSection {...{ artistData }} />
          </div>
        </div>)}
      </div>
    </>
  );
};

export default Posts;
