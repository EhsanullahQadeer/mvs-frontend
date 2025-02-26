import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import visaIcon from '../../../assets/icons/visa.svg';
import musicBeam from "../../../assets/icons/musicBeam.svg";

interface AudioTrackTypeArray {
  id: number;
  title: string;
  length: string;
  size: string;
  provider: string;
}

interface ISampleSendDemoModal {
  open: boolean;
  onClose: () => void;
  onCloseAllModals: () => void;
  selectedSamples: AudioTrackTypeArray[];
}

const SampleSendDemoModal: React.FC<ISampleSendDemoModal> = ({
  open,
  onClose,
  onCloseAllModals,
  selectedSamples,
}) => {
  const samplePrice = 5.00; // Price per sample
  const serviceFeePercentage = 0.02; // 2%
  const subtotal = selectedSamples.length * samplePrice;
  const serviceFee = subtotal * serviceFeePercentage;
  const total = subtotal + serviceFee;

  const handleSendSamples = (samples: AudioTrackTypeArray[]) => {
    // Implementation of handleSendSamples function
    console.log("Sending samples:", samples);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#131313',
          color: '#FFFFFF',
          minWidth: '800px',
          minHeight: '600px',
          '& .MuiDialogContent-root': {
            padding: '0',
          }
        }
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">Send Demos</h2>
            <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-[#999999]">Your Selection ({selectedSamples.length})</h3>
          
          {/* Sample List Table */}
          <div className="w-full">
            {selectedSamples.map((sample) => (
              <div 
                key={sample.id} 
                className="flex items-center justify-between py-3 px-4 border border-[#1C1C1C] bg-[#0F0F0F] rounded-lg mb-2"
              >
                <div className="w-8 h-8 bg-[#2A2A2A] rounded flex items-center justify-center">
                  <img src={musicBeam} alt="Music" className="w-4 h-4" />
                </div>
                <div className="w-[30%] text-[#B3B3B3]">{sample.title}</div>
                <div className="w-[12%] text-[#B3B3B3]">{sample.length}</div>
                <div className="w-[12%] text-[#B3B3B3]">{sample.size}</div>
                <div className="w-[12%] text-[#B3B3B3]">BMinor</div>
                <div className="w-[12%] text-[#B3B3B3]">122</div>
              </div>
            ))}
          </div>

          {/* Updated Billing Method section */}
          <div className="mt-6">
            <h3 className="text-gray-400 mb-3">Billing method</h3>
            <div className="flex items-center gap-3 p-4 border border-[#3D3D3D] rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="inline-flex items-center">
                  <label className="relative flex items-center cursor-pointer" htmlFor="payment-method">
                    <input
                      name="payment"
                      type="radio"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#3D3D3D] checked:border-[#3D3D3D] transition-all"
                      id="payment-method"
                      defaultChecked
                    />
                    <span className="absolute bg-[#0066FF] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                </div>
                <img src={visaIcon} alt="Visa" className="h-4 mx-3" />
                <div>
                  <p className="text-sm">Visa ending in 7879</p>
                  <p className="text-xs text-gray-400">Expiry 06/2024</p>
                </div>
              </div>
              <span className="text-[#1C1C1C] text-sm bg-[#9EFF00] px-3 py-1 rounded-full">Default</span>
            </div>
            <button className="mt-3 text-[#0185FF] text-sm hover:underline flex items-center gap-1">
              <span>+</span> Add new billing method
            </button>
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-[#999999]">
                Price ({selectedSamples.length} selected samples - ${samplePrice.toFixed(2)} each)
              </span>
              <span className="text-[#999999]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999999]">Service Fee (2.9%)</span>
              <span className="text-[#999999]">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2">
              <span className="text-[#B9B9B9]">Total Amount</span>
              <span className="text-[#7ECC00]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Dashed border and disclaimer */}
          <div className="border-b border-dashed border-[#3D3D3D] my-4"></div>
          
          <p className="text-[#999999] text-sm">
            By clicking "Send {selectedSamples.length} demos," you are authorizing the charge to your account. If you have sufficient funds available, the amount will be deducted from your balance. Otherwise, the total will be charged to your primary payment method.
            <br /><br />
            This transaction is final, and refunds are not available once the sample has been sent.
          </p>

          {/* Send Button - Added flex container for alignment */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                handleSendSamples(selectedSamples);
                onCloseAllModals();
                onClose();
              }}
              disabled={selectedSamples.length === 0}
              className={`
                min-w-[140px] px-8 py-3 rounded-full font-medium text-base flex-shrink-0
                ${selectedSamples.length === 0 
                  ? 'bg-[#242424] text-[#3D3D3D] cursor-not-allowed'
                  : 'bg-[#1ed760] text-black hover:brightness-110 transition-all cursor-pointer'}
              `}
            >
              Send {selectedSamples.length} demos 
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SampleSendDemoModal;
