import * as React from "react";

interface TagProps {
    text: string;
    isActive?: boolean;
}

const Tag: React.FC<TagProps> = ({ text, isActive = false }) => {
    const activeClasses = isActive
        ? "text-white border-2 border-lime-300 bg-lime-300 bg-opacity-30"
        : "border border-zinc-800 bg-neutral-900";

    return (
        <div
            className={`justify-center px-4 py-2.5 border-solid rounded-[34px] ${activeClasses}`}
        >
            {text}
        </div>
    );
};

interface SampleItemProps {
    imageSrc: string;
    title: string;
    artist: string;
}

const SampleItem: React.FC<SampleItemProps> = ({
    imageSrc,
    title,
    artist,
}) => {
    return (
        <div className="flex flex-1 gap-3 justify-between items-center py-2 pr-5 pl-2.5 border-t border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
            <div className="flex justify-center items-center self-stretch my-auto">
                <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                    <img src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1533fade708a3e33de861017f5e4c4b380a5ade6339516c6120a90cd7626a1a5?apiKey=dc17e74fd8f04620bba968dc4f90b76e&" alt="" className="w-full aspect-square" />
                </div>
            </div>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7005203c464ae9b406c176f3f9b3366207b2b03a676f5c3b662048248b38738c?apiKey=dc17e74fd8f04620bba968dc4f90b76e&" alt="" className="shrink-0 self-stretch my-auto w-5 aspect-square" />
            <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                <div className="text-sm text-gray-300">{title}</div>
                <div className="mt-1 text-xs font-medium text-neutral-500">{artist}</div>
            </div>
            <div className="justify-center items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800">
                Available
            </div>
        </div>
    );
};

const sampleData: SampleItemProps[] = [
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d13f26683ca14818574af736d0f788c08e83d1e1a031c194f762614b7c10cff?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5f35c4fe065971eb53eaa2d14b13fddb3d0dfe5c6372acaca1a3265a969768d?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a522c5af6915fe22bb9ab740589a7c22855a3840ae8cf359a62512ba4d0eb6b0?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d13f26683ca14818574af736d0f788c08e83d1e1a031c194f762614b7c10cff?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5f35c4fe065971eb53eaa2d14b13fddb3d0dfe5c6372acaca1a3265a969768d?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a522c5af6915fe22bb9ab740589a7c22855a3840ae8cf359a62512ba4d0eb6b0?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d13f26683ca14818574af736d0f788c08e83d1e1a031c194f762614b7c10cff?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b5f35c4fe065971eb53eaa2d14b13fddb3d0dfe5c6372acaca1a3265a969768d?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
    {
        imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a522c5af6915fe22bb9ab740589a7c22855a3840ae8cf359a62512ba4d0eb6b0?apiKey=dc17e74fd8f04620bba968dc4f90b76e&",
        title: "soundboyz_guitar_clean_120bpm_Dmin",
        artist: "SoundBoyz",
    },
];

const ProducerLibrary = ({ tags }): any => {
    return (
        <div className="container">
            <div className="flex flex-col justify-center px-5 mt-8">
                {tags && (
                    <>
                        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                            <div className="flex gap-5 font-medium max-md:flex-wrap">
                                <div className="flex flex-col justify-center px-4 py-2.5 text-base bg-neutral-900 rounded-[34px] text-zinc-600 w-[191px] h-[39px]">
                                    <div className="flex gap-2.5 py-1">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db9cae867e61d6f98643149ff642c965ee8194a124332064cf7938d4a912026c?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                            alt=""
                                            className="shrink-0 w-6 aspect-square"
                                        />
                                        <div className="my-auto">Search for tags</div>
                                    </div>
                                </div>
                                <div className="flex flex-1 gap-2 self-start text-sm whitespace-nowrap text-stone-300 max-md:flex-wrap max-md:max-w-full">
                                    <Tag text="synth" />
                                    <Tag text="guitar" />
                                    <Tag text="reggaeton" isActive />
                                    <Tag text="dark" />
                                    <Tag text="r&b" />
                                    <Tag text="happy" />
                                    <Tag text="eastern" />
                                    <Tag text="southern" />
                                    <Tag text="american" />
                                    <Tag text="american" />
                                    <Tag text="savage" />
                                </div>
                            </div>
                            <div className="flex gap-1 justify-between py-1 pr-1.5 my-auto text-sm font-semibold text-neutral-400">
                                <div>Clear all filters</div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/326c4fd6831438d23921ff01d8d517cc8af8fc02f46c11fd0242c08cbbf255d9?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                    alt=""
                                    className="shrink-0 my-auto w-3 border-2 border-solid aspect-square border-neutral-400 stroke-[2px] stroke-neutral-400"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 self-start mt-2 text-sm font-medium whitespace-nowrap text-stone-300 max-md:flex-wrap">
                            <Tag text="synth" />
                            <Tag text="guitar" isActive />
                            <Tag text="reggaeton" />
                            <Tag text="dark" />
                            <Tag text="r&b" />
                            <Tag text="happy" />
                            <Tag text="eastern" isActive />
                            <Tag text="country" />
                        </div>
                    </>
                )}

                <h2 className="mt-8 text-xl font-semibold text-white max-md:max-w-full mt-[100px]">
                    Library
                </h2>
                <div className="flex gap-4 self-start py-2.5 mt-2 text-base text-zinc-700">
                    <div className="text-white">Samples</div>
                    <div>Instrumentals</div>
                    <div>Full Songs</div>
                    <div className="shrink-0 px-2 my-auto w-5 h-4" />
                </div>
                <div className="flex overflow-hidden relative flex-col justify-center items-start mt-2 max-w-full border-2 border-solid aspect-[311] border-zinc-700 stroke-[2px] stroke-zinc-700 w-[311px] max-md:pr-5">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5bec8a679777180a01b47867f8f2fa1bc2581c647207f95a6a52716ae91c2b3?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                        alt=""
                        className="object-cover absolute inset-0 size-full"
                    />
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/903b3e87409b0ddcfe469cacdcc5a213299b475a11564908402fb98a99053921?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                        alt=""
                        className="border-2 border-solid aspect-[50] border-neutral-50 stroke-[2px] stroke-neutral-50 w-[59px]"
                    />
                </div>
                <div className="flex gap-5 justify-between p-2.5 mt-6 max-md:flex-wrap max-md:max-w-full">
                    <h2 className="text-2xl font-semibold text-white">Samples</h2>
                    <div className="text-sm text-neutral-400">See All</div>
                </div>
                <div className="flex gap-3 mt-5 max-md:flex-wrap">
                    {sampleData.slice(0, 3).map((sample) => (
                        <SampleItem key={sample.title} {...sample} />
                    ))}
                </div>
                <div className="flex gap-3 max-md:flex-wrap">
                    {sampleData.slice(3, 6).map((sample) => (
                        <SampleItem key={sample.title} {...sample} />
                    ))}
                </div>
                <div className="flex gap-3 max-md:flex-wrap">
                    {sampleData.slice(6).map((sample) => (
                        <SampleItem key={sample.title} {...sample} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProducerLibrary;