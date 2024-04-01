import * as React from "react";

const SongItem = ({ rank, image, title, artist }) => (
  <div className="flex  text-white w-[288px] h-[50] pb-[8px] pt-[8px]">
    <div className="flex gap-3 px-7 text-sm font-semibold whitespace-nowrap">
      <div className="my-auto">{rank}</div>
      <img src={image} alt={`${title} album cover`} className="shrink-0 aspect-square w-[50px]" />
    </div>
    <div className="flex flex-col px-5 my-auto">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-2 text-xs">{artist}</div>
    </div>
  </div>
);

const FeaturedSongItem = ({ rank, image, title, artist }) => (
  <div className="flex  h-[50] pb-[8px] pt-[8px] rounded-lg border border-solid backdrop-blur-[12.5px] bg-neutral-800 bg-opacity-80 border-neutral-700 border-opacity-80 w-[288px]">
    <div className="flex gap-3 px-7 text-sm font-semibold whitespace-nowrap">
      <div className="my-auto text-sm font-semibold text-white">{rank}</div>
      <div className="flex overflow-hidden relative flex-col justify-center items-center p-3.5 aspect-square w-[50px]">
        <img src={image} alt={`${title} album cover`} className="object-cover absolute inset-0 size-full" />
      </div>
    </div>
    <div className="flex flex-col px-5 featured text-white">
      <div className="text-sm font-medium underline">{title}</div>  
      <div className="mt-2 text-xs">{artist}</div>
    </div>
  </div>
);

const songs = [
  { rank: 1, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d016c120a26b424a594c08d57509129b98635ff0e42f581b3f80d2fb70170b0f?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&", title: "Sweet Guitars", artist: "SoundBoyz" },
  { rank: 2, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d6be0048b7fcc60a593f1bc2c12a0d0340524fa62a67dfc76e71ac7f40023e5?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&", title: "Sweet Guitars", artist: "SoundBoyz" },
  { rank: 4, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1322d8960e54386d0a52fdd07f2ab7229a3e3a02d68ec2f144a3b11ecd36155?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&", title: "Sweet Guitars", artist: "SoundBoyz" },
  { rank: 5, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c3e409e547f4ed5632ed7359ecafa9f85be9dcdc2366a86f9ab2c96751bfdcd?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&", title: "Sweet Guitars", artist: "SoundBoyz" },
];

const featuredSong = {
  rank: 3, 
  image: "https://cdn.builder.io/api/v1/image/assets/TEMP/867d697fe567d1110b390deae8cb38794d5a39b86e7a253a8c293d69f5168b3a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  title: "Sweet Guitars",
  artist: "SoundBoyz",
};

const WeeklyTop = () => {
  return (
    <div className="flex flex-col items-center pb-2.5 bg-black w-[321px] h-[391px]">
      <header className="flex gap-5 justify-between self-stretch px-4 py-2.5 w-full border-b border-solid bg-stone-950 border-zinc-900">
        <h2 className="my-auto text-xl text-zinc-300">Weekly Top</h2>
        <button className="justify-center px-5 py-2 text-xs text-gray-200 border border-gray-200 border-solid rounded-[50px]">
          View All
        </button>
      </header>
      <main>
        {songs.slice(0, 2).map((song) => (
          <SongItem key={song.rank} {...song} />
        ))}
        <FeaturedSongItem {...featuredSong} />
        {songs.slice(2).map((song) => (
          <SongItem key={song.rank} {...song} />  
        ))}
      </main>
    </div>
  );
}

export default WeeklyTop;