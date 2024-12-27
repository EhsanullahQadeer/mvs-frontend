import React, { useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi';

const SubmitTrack = () => {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
  }
  return (
    <>
    <div >
        <h2 className='text-[28px] text-[#fff] font-semibold'>Submit Your Track for Mastering</h2>
        <p className='mt-[8px] mb-[12px] text-silver text-xs'>
        Got a track that needs that final touch? Send it over to Eman for mastering! With his experience on countless hits, he’ll make sure your song sounds clean, polished, and ready for release. 
        </p>
        <div className="flex py-5 px-3 flex-col items-center justify-center w-full  border-2 border-dashed border-neutral-600 rounded-md ">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center gap-[4px] cursor-pointer"
      >
        <div className='w-[37px] relative h-[48px] bg-mediumGray rounded-lg'>


       <span className='absolute border border-dimGray top-[23px] left-[18px] w-6 h-6 rounded-full flex justify-center items-center bg-eerieBlack'><FiUploadCloud className='text-silver  text-sm ' />
       </span>
       </div>
       {selectedFile && (
        <p className=" text-xs text-neutral-400">
          file: <span className="text-white text-xs">{selectedFile}</span>
        </p>
      )}
        <div className=" flex items-center justify-center flex-col text-xs ">
          <span className="text-[#C4E2FF] font-medium underline">Click to upload</span>
          <span className='text-coolGray'>          or drag and drop
          </span>
        </div>
        <p className="text-xs text-dimGray">Maximum file size 50MB</p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      
    </div>

        </div>
      
    </>
  )
}

export default SubmitTrack
