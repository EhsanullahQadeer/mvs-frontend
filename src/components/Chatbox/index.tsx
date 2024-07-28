/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides the Chatbox component with integrated payment 
 *       functionalities.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React from 'react';
import { 
  Elements,
  useElements,
  useStripe,
  CardElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { config } from 'config/ConfigManager';
import Modal from "react-modal";

/* LOCAL IMPORTS */
import { useChatboxHooks } from './Chatbox.hooks';
import { ChatboxProps } from './Chatbox.types';
import PurchaseOrderModal from 'components/modals/PurchaseOrder/PurchaseOrder';

const stripePromise = loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'));

const Chatbox: React.FC<ChatboxProps> = ({
  // Metadata
  messages,
  setMessages,
  recipientId,
  conversationId,
  // Recipient Profile Information
  RecipientProfile,
}) => {

  /* States and Hooks */
  const {
    newMessage, setNewMessage,
    renderConversationMessages,
    sendMessageWithDemoTrack,
    recording, startRecording, stopRecording, deleteRecording,
    audioBlob, fileUrl, audioRef,
    audioURL, openModal, modalIsOpen, closeModal,
    confirmPaymentIsOpen, handleConfirmPayment,
    focusedPaymentIntent,
  } = useChatboxHooks(setMessages);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="message-details">
        {/* <button className="close-button" onClick={handleCloseConversation}>&#x2715;</button> */}
        <h2>Conversation with {recipientId}</h2>

        {/* List of conversations */}
        <div className="flex-grow overflow-y-auto p-2 border border-gray-300 rounded bg-1C1C1C">
          {renderConversationMessages(messages)}
        </div>
        
        <div className="message-input-container">
          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {/* AUDIO STUFF */}
            <div>
              {fileUrl && (
                <audio ref={audioRef} controls src={audioURL} />
              )}
            </div>
      
            {/* Send message with demo track */}
            {/* Open Modal to send demo track */}
            <button 
              onClick={openModal}
              className="self-end px-4 py-2 bg-blue-500 text-white rounded"
            >
              Send Demo Track
            </button>

            {/* Send demo track with payment */}
            <PurchaseOrderModal
              show={modalIsOpen}
              recipientId={recipientId}
            />

            <button
              onClick={() =>
              sendMessageWithDemoTrack(
                stripe,
                elements,
                conversationId,
                recipientId,
              )}>
              Send
            </button>

            {/* Payment form */}
            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit" disabled={!stripe}>
                Pay
              </button>
            </form>

            <Modal
              isOpen={confirmPaymentIsOpen}
              onRequestClose={closeModal}
              contentLabel="Send Demo Track Modal"
              style={{
                content: {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '500px',
                  background: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  zIndex: '1000',
                },
                overlay: {
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: '999',
                },
              }}
              shouldCloseOnOverlayClick={true}
            >
              <div className="flex flex-col items-center">
                <h2 className="mb-4 text-xl">Record Audio</h2>
                <div 
                  className="flex flex-col items-center p-4 bg-gray-100 rounded" 
                  style={{width: 'fit-content'}}
                >
                  <div className="flex space-x-4">
                    {!recording ? (
                      <button
                        onClick={startRecording}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Start Recording
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Stop Recording
                      </button>
                    )}
                    <button
                      onClick={deleteRecording}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                      disabled={!audioBlob}
                    >
                      Delete Recording
                    </button>
                  </div>

                  {/* Audio is ready to submit */}
                  {audioURL && (
                    <div className="mt-4">
                      <audio
                        ref={audioRef} 
                        controls 
                        src={audioURL} 
                        className="w-full"
                      />
                    </div>
                  )}

                  <button
                    onClick={() =>
                      handleConfirmPayment( 
                        recipientId,
                        conversationId,
                        focusedPaymentIntent )
                    }
                    disabled={!audioURL}
                    >
                      Submit
                  </button>

                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Chatbox;
