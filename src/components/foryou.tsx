import * as React from "react";

const genres = [
  {
    name: "Reggaeton",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/404f514264c741ae91453a307f2bd82d7d51f6ff01cb4aab115cafbeb1daa050?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/16a6d4c7f397b2010f102e07fc7e0595b13b0f74b145a2c8b6dc1353cb5fb337?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "R&B",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/55fe60cf24e60b548a97d2ac23433a6a3566ec944289025468917b99a5fecf53?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "Hip-Hop",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf0cb23b83eb90eb142a96db6212b84a70d1a79f9b8f04cdd86f7448e6fcc4e4?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "Pop",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f435d957f63aa8796745be370b6a8409ed488634e37006e5ff8b48a55b60ee31?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "Afrobeat",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7b067e2ac8cc7badfea882af94aa02b0ce1ee4b427ed4f1033784be18a1ca9f?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "Afrobeat",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7b067e2ac8cc7badfea882af94aa02b0ce1ee4b427ed4f1033784be18a1ca9f?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "Country",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/cdf26340768c9c7fb341b70828c91ddd88c0651760e70c0edd257468c00f6b64?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
  {
    name: "Country",
    artists: "Bad Bunny, Mora, Feid, Annuel AA...",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&",
  },
];

function GenreCard({ genre, isFirst }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex overflow-hidden relative flex-col px-3 pt-20 pb-6 w-[190px] h-[140px]`}
      >
        <img
          loading="lazy"
          src={genre.image}
          alt={`${genre.name} genre cover`}
          className="object-cover absolute inset-0 size-full"
        />
        {isFirst && (
          <img
            loading="lazy"
            src={genre.icon}
            alt={`${genre.name} icon`}
            className="w-8 aspect-square fill-white"
          />
        )}
        <div
          className={`relative ${
            isFirst ? "mt-3" : "self-center"
          } text-base font-semibold text-white`}
        >
          {genre.name}
        </div>
          <div className="relative text-center self-stretch mt-3 text-[9px] leading-[12px] font-medium text-neutral-400 ">
            {genre.artists}
          </div>
        
      </div>
    </div>
  );
}

const  Foryou = () => {
  return (
    <section className="flex flex-col items-start px-4 py-5 bg-black  w-auto">
      <h2 className="text-xl font-semibold text-white max-md:max-w-full">
        For You
      </h2>
      <p className="mt-3 text-sm text-zinc-500 max-md:max-w-full">
        Dive into a world of inspiration with our expertly curated collection of
        the latest samples.
      </p>
      <div className="flex overflow-x-auto gap-3 self-stretch mt-3 max-md:flex-wrap">
        {genres.map((genre, index) => (
          <GenreCard key={index} genre={genre} isFirst={null} />
        ))}
      </div>
    </section>
  );
}

export default Foryou;