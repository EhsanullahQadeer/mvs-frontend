/*************************************************************************
 * @file SampleContainer/components/header.tsx
 * @author End Quote
 * @desc 
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

interface SampleHeaderProps {
  loading: boolean;
  total: number;
}

const SampleHeader: React.FC<SampleHeaderProps> = ({ 
  loading, 
  total 
}) => {
  
  return(
    <>
      {/* TOP BANNER */}
      <div className="bg-[#101010] p-[20px] flex justify-start border-b-2 border-[#1F1F1F]">
      {loading ? (
        <>
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <>
          {(() => {
            // switch (1) {
            //   case "likes":
            //     return (
            //       <div>
            //         <div className="bg-[#101010] p-[20px] flex justify-start">
            //           <div className="mt-[16px] gap-[22px] flex">
            //             <div>
            //               {/* eslint-disable-next-line */}
            //               <img
            //                 src={lockImage}
            //                 alt="Download"
            //                 width="250"
            //                 height="250"
            //                 style={{ display: 'block', margin: 'auto' }} // Center image
            //               />
            //             </div>
            //             <div className="text m-[20px]">
            //               <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
            //                 Likes
            //               </p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //   );

            //   case "downloads":
            //     return (
            //       <div>
            //         <div className="bg-[#101010] p-[20px] flex justify-start">
            //           <div className="mt-[16px] gap-[22px] flex">
            //             <div>
            //               {/* eslint-disable-next-line */}
            //               <img
            //                 src={downloadPicture}
            //                 alt="Download"
            //                 width="250"
            //                 height="250"
            //                 style={{ display: 'block', margin: 'auto' }} // Center image
            //               />
            //             </div>
            //             <div className="text m-[20px]">
            //               <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
            //                 Downloads
            //               </p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //   );

            //   default:
            //     return (
            //       <div className="mt-0 gap-3 flex justify-start">
            //         <div className="flex items-center gap-4">
            //           <div>
            //             {/* eslint-disable-next-line */}
            //             <img className="h-[250px]" src={sound?.thumbnail} style={{ minHeight: '175px', minWidth: '175px', borderRadius: '4px' }} />
            //           </div>
            //           <div className="text flex-grow max-w-[335px]">
            //             <p className="text-[28px] text-[#fff] font-['Mona-Sans-M']">
            //               {sound?.name}
            //             </p>
            //             <p className="text-[#878787] text-[12px] font-['Mona-Sans-M']">
            //               By: {sound?.author}
            //             </p>
            //             <p className="text-[14px] font-['Mona-Sans-R'] text-[#bebebe]">
            //               {sound?.description}
            //             </p>
            //           </div>
            //         </div>
            //         <div className="border-x border-[#282828] border-y-0 my-[50px] h-[145px]"></div>
            //       </div>
            //     );
            // }
          })()}
        </>
      )}
      </div>

      <div className="drop bg-[#101010] px-[20px] py-[10px]">
        <h3 className="text-[20px] text-[#fff] font-['Mona-Sans-M']">
          Samples
        </h3>
        <p className="text-[#9C9C9C] text-[14px] font-['Mona-Sans-M'] pt-[4px]">
          {total} Results
        </p>
      </div>
    </>
  );
}


export default SampleHeader;