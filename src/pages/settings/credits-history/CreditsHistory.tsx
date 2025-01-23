/*************************************************************************
 * @file CreditsHistory.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is page for Credits History.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import Theme from "theme";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CreditsHistory = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Theme>
      <div>
        <div className="flex gap-3 px-4 py-5 border-b border-eclipseGray">
          <div
            onClick={handleBack}
            className="text-platinum cursor-pointer w-max"
          >
            <FaArrowLeft />
          </div>
        </div>
        <div className="px-4 my-5">
          <div className="px-2.5 py-2.5">
            <h2 className="text-2xl text-white font-semibold">
              Credits History
            </h2>
            <p className="mt-2 text-lg text-mediumGray font-normal">
              View your recent credits usage and transaction history.
            </p>
          </div>
        </div>
      </div>
    </Theme>
  );
};

export default CreditsHistory;
