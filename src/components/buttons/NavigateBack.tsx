import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface NavigateBackButtonProps {
  switchState?: (value: boolean) => void;
}

const NavigateBackButton:  React.FC<NavigateBackButtonProps> = ({
  switchState,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (switchState) {
      // If switchState is provided, toggle the current state
      switchState(true);
    } else {
      // If switchState is not provided, navigate back
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className="w-full py-2 px-4 bg-darkGray text-white font-semibold rounded-full text-sm border border-[#FFFFFF]"
      onClick={handleClick}
    >
      Back
    </button>
  );
};

export default NavigateBackButton;