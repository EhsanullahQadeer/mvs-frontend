import React from "react";
import { useNavigate } from "react-router-dom";
import successIcon from "../../../assets/icons/success.svg";

const ChangeSuccessfully: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <img src={successIcon} alt="" />
        <div className="flex pt-[30px] justify-center flex-col  items-center">
          <h2 className="text-3xl p-2.5 font-semibold tracking-tighter">
            Password Changed
          </h2>
          <p className="text-mediumGray pb-6 p-2.5 text-center">
            Your password has been changed succesfully.
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="w-full bg-limeGreen text-sm text-jetBlack font-semibold py-3 rounded-full"
          >
            Back to mvssive
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeSuccessfully;
