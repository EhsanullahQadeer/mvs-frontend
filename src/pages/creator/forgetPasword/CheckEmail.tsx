import React from 'react'
import EmailIcon from '../../../assets/icons/checkEmail.svg'


const CheckEmail:React.FC = () => {
  return (
    <>
    <div className="flex flex-col w-full  items-center justify-center h-full  bg-[#131313] text-white">
        <img src={EmailIcon} alt="" />
        <div className=" flex pt-[30px] justify-center flex-col  items-center ">
          <h2 className="text-3xl p-2.5 font-semibold tracking-tighter ">
            Check your Email
          </h2>
          <p className="text-[#999] w-[55%] p-2.5 text-center  text-sm">
          Please follow the instructions in the email sent to s*******@mvssive.net to complete the process.
          </p>
          <button
          type="button"
          className=" w-72  my-5  border text-[#E5E5E5] border-[#E5E5E5] text-sm font-semibold py-3 rounded-full "
        >
          Re-send Email
        </button>
        </div>
        <p className="py-3.5 w-72  px-2 text-center text-xs text-[#CCC]">
          By submitting your information, you agree to our{" "}
          <span className="text-[#9EFF00]">Terms of Service</span> and{" "}
          <span className="text-[#9EFF00]">Privacy Policy</span>
        </p>
      </div>
    </>
  )
}

export default CheckEmail
