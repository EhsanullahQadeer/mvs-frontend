import React from 'react'
import { useNavigate } from 'react-router-dom';
import successIcon from "../../../assets/icons/success.svg"

const ChangeSuccessfully: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/home");
      };
  return (
    <>
       <div className="flex flex-col w-full  items-center justify-center h-full  bg-[#131313] text-white">
        <img src={successIcon} alt="" />
        <div className=" flex pt-[30px] justify-center flex-col  items-center ">
          <h2 className="text-3xl p-2.5 font-semibold tracking-tighter ">
            Password Changed
          </h2>
          <p className="text-[#999]  pb-6 p-2.5 text-center  ">
          Your password has been changed succesfully.
          </p>
          <button
          type="button"
          onClick={handleClick}
          className=" w-full bg-[#9EFF00] text-sm text-black font-semibold py-3 rounded-full "
          >
          Back to mvssive
        </button>
        </div>
      
    </div>
      
    </>
  )
}

export default ChangeSuccessfully
