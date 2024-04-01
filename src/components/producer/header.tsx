import * as React from "react";

interface CollaboratorProps {
  name: string;
}

const Collaborator: React.FC<CollaboratorProps> = ({ name }) => (
  <div className="justify-center px-3 py-2.5 rounded-lg bg-neutral-900">{name}</div>
);

interface GenreProps {
  name: string;
}

const Genre: React.FC<GenreProps> = ({ name }) => (
  <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">{name}</div>
);

const collaborators = ["Justin Quiles", "Daddy Yankee", "Sech", "Arcangel", "Rauw Alejandro"];
const genres = ["Reggaeton", "Mambo", "R&B", "Hip-Hop", "Bachata", "Pop", "Salsa"];

const ProducerHeader: React.FC = () => {
  return (
    <div className="p-5  w-[1080px]">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ad35ba94e7555dd611da7da5c25e1affd0d06632a52917e3388a531293222fb?apiKey=dc17e74fd8f04620bba968dc4f90b76e&" alt="Dimelo Flow profile" className="shrink-0 max-w-full aspect-square w-[250px] max-md:mt-10" />
        </div>
        <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
          <div className="grow self-stretch py-2 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow self-stretch py-3 text-sm max-md:mt-10">
                  <h1 className="text-4xl font-semibold text-white">Dimelo Flow</h1>
                  <div className="mt-2 text-zinc-300">@dimeloflow</div>
                  <p className="mt-4 text-stone-300">
                    Jorge Valdés Vázquez, better known as DJ Flow or Dímelo Flow, is a Panamanian DJ and producer based in the United States.
                  </p>
                  <div className="flex gap-1.5 mt-3.5 text-xs text-white">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/70f20dd347fc369dbc84ce676b00f8e1e76d96e4613818ace8dcc2978c5efdd3?apiKey=dc17e74fd8f04620bba968dc4f90b76e&" alt="" className="shrink-0 aspect-[3.03] w-[73px]" />
                    <div className="my-auto">
                      Followed By <span className="font-semibold">Bad Bunny, Young Miko, Archangel</span> and 10 others
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6 font-semibold">
                    <button className="flex gap-2 px-4 py-2.5 text-black whitespace-nowrap bg-lime-300 rounded-lg max-md:px-5">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d56623331c8dc7c3cc5f229e619ea8eaf6114b31a03540bd73fad07ec751445e?apiKey=dc17e74fd8f04620bba968dc4f90b76e&" alt="" className="shrink-0 w-5 aspect-square" />
                      <span className="my-auto">Share</span>
                    </button>
                    <button className="flex gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-200 border-solid text-zinc-300 max-md:px-5">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/20ffa6fd51bd4c0f822344c3ff15ad44d3b9caedf88fe1a223f42dc85a46b968?apiKey=dc17e74fd8f04620bba968dc4f90b76e&" alt="" className="shrink-0 w-5 aspect-square" />
                      <span className="my-auto">Send Request</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow self-stretch pb-16 text-sm font-semibold text-zinc-300 max-md:mt-10 max-md:max-w-full">
                  <h2 className="max-md:max-w-full">COLLABORATORS</h2>
                  <div className="flex flex-wrap gap-2 content-start pr-20 mt-2 text-xs font-medium text-stone-300 max-md:pr-5">
                    {collaborators.map((collaborator) => (
                      <Collaborator key={collaborator} name={collaborator} />
                    ))}
                  </div>
                  <h2 className="mt-3 max-md:max-w-full">GENRES</h2>
                  <div className="flex flex-wrap gap-2 content-center items-start pr-20 mt-2 text-xs font-medium whitespace-nowrap text-stone-300 max-md:pr-5 max-md:max-w-full">
                    {genres.map((genre) => (
                      <Genre key={genre} name={genre} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerHeader;