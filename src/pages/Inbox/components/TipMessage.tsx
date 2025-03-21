import TipIcon from '../../../assets/icons/dollar-sign.svg';

const TipMessage = ({ amount, message }) => {
  //console.log("amount", amount);
  return (
    <div className="flex gap-2 p-1 rounded-md">
      <div className="flex items-start bg-[#1c1c1c] border border-[#3f6600] rounded-lg p-2 text-white inline-flex max-w-full">
        <div className="flex justify-items-center flex-shrink min-w-0">
          <div className="bg-[#2a2a2a] rounded-full p-1.5 mr-2 flex-shrink-0 flex items-center justify-center text-base text-[#7ecc00]">
          <img src={TipIcon} alt="Tip" className="w-5 h-5" />
        </div>
        
        <div className="w-0.5 bg-[#242424] h-auto mr-3 self-stretch flex-shrink-0"></div>
        
        <div className="flex flex-col justify-center flex-shrink min-w-0">
          <div className="text-base text-white flex items-center flex-wrap">
            <span className="mr-1 whitespace-nowrap">Amount:</span>
            <span className="text-[#7ecc00] whitespace-nowrap">${Number(amount)?.toFixed(2)}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TipMessage;
