import * as React from "react";

function Icon({ src, alt, className, onClick }) {
  return (
    <button onClick={onClick} className={`shrink-0 ${className}`}>
      <img src={src} alt={alt} />
    </button>
  );
}

function IconText({ src, alt, text, className, onClick }) {
  return (
    <button onClick={onClick} className={`flex gap-2 ${className}`}>
      <Icon src={src} alt={alt} className="w-6 aspect-square" onClick={undefined} />
      <div className="my-auto">{text}</div>
    </button>
  );
}

function Divider(className) {
  return (
    <hr className="w-full border border-solid border-neutral-600 border-opacity-50 stroke-[1px] stroke-neutral-600 stroke-opacity-50" />
  );
}

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const iconTextItems = [
    { src: "{{ext_29}}", alt: "", text: "Inbox", onClick: () => alert("Inbox clicked") },
    { src: "{{ext_30}}", alt: "", text: "Activity", onClick: () => alert("Activity clicked") },
    { src: "{{ext_31}}", alt: "", text: "Agreements", onClick: () => alert("Agreements clicked") },
    { src: "{{ext_32}}", alt: "", text: "Licenses", onClick: () => alert("Licenses clicked") },
  ];

  const collectionItems = [
    { src: "{{ext_33}}", alt: "", text: "Likes", onClick: () => alert("Likes clicked") },
    { src: "{{ext_34}}", alt: "", text: "Sweet R&B Loops", onClick: () => alert("Sweet R&B Loops clicked") },
  ];

  return (
    <div className="flex flex-col px-6 py-2.5 mx-auto w-full bg-black max-md:px-5">
      <header className="flex gap-5 justify-between pr-5 w-full">
        <div className="flex gap-3">
          <div className="flex justify-center items-center w-10 h-10 bg-white rounded-[100px]">
            <Icon src="{{ext_35}}" alt="" className="w-10 aspect-square" onClick={undefined} />
          </div>
          <h1 className="my-auto text-xl font-bold text-white">MVSSIVE</h1>
        </div>
        <Icon
          src="{{ext_36}}"
          alt=""
          className="my-auto w-6 aspect-square"
          onClick={toggleMenu}
        />
      </header>
      {isMenuOpen && (
        <>
          <div className="flex gap-2 px-4 py-3 mt-8 text-sm font-medium whitespace-nowrap rounded-lg bg-neutral-900 text-neutral-500">
            <Icon src="{{_37}}" alt="" className="w-6 aspect-square" onClick={undefined} />
            <div className="my-auto">Search</div>
          </div>
          <div className="mt-5 text-sm font-medium text-zinc-600">OVERVIEW</div>
          <div className="flex gap-5 justify-between px-6 py-3 mt-5 text-sm rounded-lg bg-neutral-800 max-md:px-5">
            <IconText
              src="{{ext_38}}"
              alt=""
              text="Contact Requests"
              className="my-auto font-semibold text-gray-300"
              onClick={() => alert("Contact Requests clicked")}
            />
            <div className="flex flex-col justify-center font-medium text-white whitespace-nowrap">
              <div className="justify-center items-center px-2 w-7 h-7 bg-red-500 rounded-full">
                13
              </div>
            </div>
          </div>
          <nav className="flex flex-col mt-5 ml-6 max-w-full text-sm font-semibold text-gray-300 whitespace-nowrap w-[110px] max-md:ml-2.5">
            {iconTextItems.map(({ src, alt, text, onClick }) => (
              <IconText
                key={text}
                src={src}
                alt={alt}
                text={text}
                className="mt-9 first:mt-0"
                onClick={onClick}
              />
            ))}
          </nav>
          <div className="flex flex-col justify-center px-2 pb-4 mt-7 text-sm">
            <Divider />
            <div className="mt-4 font-medium text-neutral-500">Library</div>
            <IconText
              src="{{ext_39}}"
              alt=""
              text="My Samples"
              className="self-start mt-8 ml-4 font-semibold text-gray-300 max-md:ml-2.5"
              onClick={() => alert("My Samples clicked")}
            />
          </div>
          <Divider className="mt-3" />
          <div className="mt-4 text-sm font-medium text-neutral-500">Collections</div>
          <IconText
            src="{{ext_40}}"
            alt=""
            text="New Collection"
            className="mx-6 mt-9 text-sm font-semibold text-gray-300 max-md:mx-2.5"
            onClick={() => alert("New Collection clicked")}
          />
          {collectionItems.map(({ src, alt, text, onClick }) => (
            <IconText
              key={text}
              src={src}
              alt={alt}
              text={text}
              className="mx-6 mt-9 text-sm font-semibold text-gray-300 whitespace-nowrap max-md:mx-2.5"
              onClick={onClick}
            />
          ))}
          <Divider className="mt-7" />
          <div className="flex gap-4 mt-4">
            <Icon
              src="{{ext_41}}"
              alt="Profile picture of Raul Cardenas"
              className="w-12 rounded-full border-2 border-blue-200 border-solid aspect-square" onClick={undefined}            />
            <div className="flex flex-1 gap-2.5 pr-6 my-auto">
              <div className="flex flex-col flex-1 justify-center">
                <div className="text-sm font-medium text-white">Raul Cardenas</div>
                <div className="mt-1 text-xs font-bold text-slate-500">@SoundBoyz</div>
              </div>
              <div className="shrink-0 px-2 my-auto w-5 h-4" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBar;