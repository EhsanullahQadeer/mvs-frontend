import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import visaIcon from '../../../assets/icons/visa.svg';
import musicBeam from "../../../assets/icons/musicBeam.svg";
import StripeElements from "components/stripe/stripeElements";
import { useMessenger } from "api/messenger/context";
import { toast } from "react-toastify";

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
  recipientId: number;
  conversationId: string;
}

interface DemoStripeProps {
  onPaymentComplete: (paymentIntentId: string) => void;
  amount: number;
  recipientId: string;
  onClose: () => void;
}

const SampleSendDemoModal: React.FC<ISampleSendDemoModal> = ({
  open,
  onClose,
  onCloseAllModals,
  selectedSamples,
  recipientId,
  conversationId,
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { sendMessage, getConversationMessages } = useMessenger();
  
  const samplePrice = 5.00;
  const serviceFeePercentage = 0.029; // 2.9%
  
  // Ensure we have valid samples before calculating
  if (selectedSamples.length === 0) {
    onClose();
    return null;
  }

  const subtotal = selectedSamples.length * samplePrice;
  const serviceFee = subtotal * serviceFeePercentage;
  const total = Math.max(Math.round((subtotal + serviceFee) * 100), 50);

  const handleSendDemo = async (intentId: string) => {
    try {
      setIsSending(true);
      
      await sendMessage({
        message: `Sent a demo: ${selectedSamples[0].title}`,
        conversationId: String(conversationId),
        sampleId: selectedSamples[0].id,
        messageType: 'sample',
        stripePaymentIntentId: intentId
      });

      toast.success("Demos sent successfully!");
      onCloseAllModals();
      getConversationMessages({
        conversationId: conversationId,
        limit: 10,
        cursor: 0
      });
    } catch (error) {
      console.error("Error sending demos:", error);
      toast.error("Failed to send demos");
    } finally {
      setIsSending(false);
    }
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
                <div className="w-[30%] text-[#B3B3B3] truncate" title={sample.title}>{sample.title}</div>
                <div className="w-[12%] text-[#B3B3B3]">{sample.length}</div>
                <div className="w-[12%] text-[#B3B3B3]">{sample.size}</div>
                <div className="w-[12%] text-[#B3B3B3]">BMinor</div>
                <div className="w-[12%] text-[#B3B3B3]">122</div>
              </div>
            ))}
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
              <span className="text-[#7ECC00]">${(total / 100).toFixed(2)}</span>
            </div>
          </div>

          {/* Dashed border and disclaimer */}
          <div className="border-b border-dashed border-[#3D3D3D] my-4"></div>
          
          <p className="text-[#999999] text-sm">
            By clicking "Send {selectedSamples.length} demos," you are authorizing the charge to your account. If you have sufficient funds available, the amount will be deducted from your balance. Otherwise, the total will be charged to your primary payment method.
            <br /><br />
            This transaction is final, and refunds are not available once the sample has been sent.
          </p>

          {/* Moved Billing Method section to bottom */}
          <div className="mt-6">
            <h3 className="text-gray-400 mb-3">Billing method</h3>
            <div className="mb-4">
              <input
                name="discount"
                type="text"
                placeholder="Enter Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="hover:border-charcoalGray flex-1 mb-2 focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm text-center p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
              />
            </div>
            <div className="my-2">
              <StripeElements 
                demoStripeProps={{
                  onPaymentComplete: handleSendDemo,
                  amount: total, // Already in cents
                  recipientId: recipientId?.toString() || '',
                  onClose: onClose
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SampleSendDemoModal;
