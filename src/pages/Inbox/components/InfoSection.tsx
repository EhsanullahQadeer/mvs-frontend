type Props = {};

const InfoSection = (props: Props) => {
  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex gap-4 justify-center items-center w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            First Name
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            Becky
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            Last Name
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            Hill
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center mt-4 w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto whitespace-nowrap basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            Email
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center rounded-lg border border-solid border-neutral-200 text-neutral-200">
            info@mvssive.net
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            User Role
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            Songwriter
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center mt-4 w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch p-2.5 w-full text-xs font-semibold leading-none text-white">
            Amount Spent
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap bg-lime-400 rounded-lg text-stone-950">
            $467.89
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch p-2.5 w-full text-xs font-semibold leading-none text-white">
            Files Submitted
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            3
          </div>
        </div>
      </div>
      <div className="border mt-5 border-solid bg-stone-500 border-stone-500 w-[100%] min-h-[1px]" />

      <div className="mt-5 w-[100%]">
        <div className="flex gap-2.5 items-center px-4 py-2 text-sm font-semibold leading-none max-w-[397px]">
          <div className="gap-2.5 self-stretch p-2 my-auto rounded border border-solid bg-neutral-800 border-zinc-900 text-neutral-700">
            File History
          </div>
          <div className="overflow-hidden gap-2.5 self-stretch p-2 my-auto text-black bg-lime-400 rounded">
            Files Sent
          </div>
        </div>
      </div>

      <div className="mt-5 history w-[100%]">
        <div className="flex items-center px-4 py-3 border-b border-stone-900">
          <div className="flex flex-1 shrink gap-3 justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px]">
            <div className="flex items-center self-stretch my-auto font-semibold whitespace-nowrap w-[145px]">
              <div className="flex flex-col justify-center self-stretch my-auto w-[129px]">
                <div className="text-sm leading-none text-white">
                  rap-demo-23...
                </div>
                <div className="self-start text-xs text-neutral-400">
                  05/7/2024
                </div>
                <div className="text-xs text-emerald-200">$149.99</div>
              </div>
            </div>
            <div className="flex overflow-hidden gap-1 items-center self-stretch px-3 py-2.5 my-auto w-40 rounded-2xl border border-solid bg-neutral-800 border-neutral-700 min-h-[44px]">
              <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-6">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain self-stretch my-auto w-6 h-6 bg-lime-400 rounded-full aspect-square fill-lime-400"
                />
              </div>
              <div className="flex relative flex-col flex-1 shrink justify-center self-stretch px-2.5 py-2.5 my-auto basis-0">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f6d697732c463093143e52b7acaee9a6b416b0c1206363c9d410bbb82dd7587?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain z-0 aspect-[32.26] w-[65px]"
                />
                <div className="flex absolute left-1 top-2/4 z-0 w-2.5 h-2.5 rounded-full -translate-y-2/4 bg-zinc-400 min-h-[10px] translate-x-[0%]" />
              </div>
              <div className="gap-2.5 self-stretch my-auto text-xs leading-none whitespace-nowrap text-zinc-400">
                3:13
              </div>
            </div>
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-9 h-9 bg-zinc-900 min-h-[36px]">
              <div className="flex self-stretch my-auto min-h-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
