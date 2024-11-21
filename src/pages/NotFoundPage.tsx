/*************************************************************************
 * @file NotFoundPage.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is 404 for all the unavailable routes.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/img/not-found-bg.png";
import sharplineImg from "../assets/img/sharpline.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const btnClick = () => {
    navigate(-1);
  };
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-darkGray overflow-hidden">
      <div className="flex flex-col items-center z-50">
        <p className="text-[30px] font-normal text-[#D5D5D5] leading-[142.023%] self-end -mb-8">
          hi there, soo...
        </p>

        <p className="text-limeGreen text-[224px] font-normal leading-[142.023%] not-found-text">
          404
        </p>

        <p className="text-[30px] font-normal text-[#D5D5D5] leading-[142.023%] text-center -mt-8">
          we can’t find this page.
        </p>

        <div
          onClick={btnClick}
          className="cursor-pointer bg-limeGreen w-[228px] rounded-[30px] p-4 text-sm font-semibold flex justify-center items-center mt-5"
        >
          Go Back!
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[852px] h-[588px]">
          <img
            src={backgroundImg}
            alt="backgroundImg"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="absolute 2xl:-left-[300px] -left-[30%] top-[180px]">
        <img src={sharplineImg} alt="sharplineImg" />
      </div>

      <div className="rotate-[300deg] absolute -top-[50px] 2xl:-right-[300px] -right-[25%]">
        <img src={sharplineImg} alt="sharplineImg" />
      </div>
    </div>
  );
};

export default NotFoundPage;
