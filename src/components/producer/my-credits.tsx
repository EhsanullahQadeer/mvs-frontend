import * as React from "react";

function CreditCard({ title, artists, releaseDate, roles, imageUrl }) {
  return (
    <div className="flex flex-col  max-md:ml-0 w-[382px] h-[120px]">
      <div className="flex grow gap-3 p-2.5 w-full text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:mt-2">
        <img src={imageUrl} alt={title} className="shrink-0 max-w-full aspect-square w-[100px] h-[100px]" />
        <div className="flex flex-col justify-center py-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1">{artists}</p>
          <p className="mt-1">{releaseDate}</p>
          <div className="flex flex-wrap gap-1 content-start pr-6 mt-3 font-bold text-zinc-300 max-md:pr-5">
            {roles.map((role, index) => (
              <div key={index} className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCredits() {
  const creditData = [
    {
      title: "The Academy",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "En Bajita",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "Tempo",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "Tempo",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "Sigues Con El",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/e765bf18856cd827b505070d727be836c3013c97315ccc399d2a629411a31fd4?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "El Favor",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d6dfee02b99646b8c6ec9537de295c9f842d19f1bd65ea066552a10bd114da64?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "Mojabi Ghost",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa50aa38cbf46082abc6cb5378d5648f65372fd16080a084ebe451ea67f4c2bd?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
    {
      title: "Mojabi Ghost",
      artists: "Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid",
      releaseDate: "Oct 12, 2021",
      roles: ["Producer", "Featured Artist", "Composer"],
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa50aa38cbf46082abc6cb5378d5648f65372fd16080a084ebe451ea67f4c2bd?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
    },
  ];

  return (
    <div className="flex flex-col self-stretch px-5 mt-5  h-[280px]">
      <h2 className="text-xl font-medium text-neutral-300 max-md:max-w-full mb-5">My Credits</h2>
      <div className="flex overflow-x-auto flex-col mt-2 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {creditData.slice(0, 4).map((credit, index) => (
              <CreditCard key={index} {...credit} />
            ))}
          </div>
        </div>
        <div className="mt-2 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {creditData.slice(4).map((credit, index) => (
              <CreditCard key={index} {...credit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCredits;