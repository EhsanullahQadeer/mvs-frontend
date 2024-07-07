/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides the Chatbox component with integrated payment 
 *       functionalities.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { 
  CardElement, 
  useElements, 
  useStripe 
} from '@stripe/react-stripe-js';

/* LOCAL IMPORTS */
import { config } from 'config/ConfigManager';
import axios from '../../api/axios';
import { RootState } from '../../redux/reducers'

interface ChatboxProps {
  selectedConversation: any;
  setSelectedConversation: (conversation: any) => void;
  messages: any;
  setMessages: (messages: any) => void;
}

const PaymentForm = ({ amount, message }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.log('test');
      return;
    }
    setIsProcessing(true);

    try {
      console.log('api', config.get('API'));
      const response = await axios.post(`${config.get('API')}/payments/create-payment-intent`, { amount });
      const clientSecret  = response.data.client_secret;
      console.log('client secrets', clientSecret);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (error) {
        console.error(error);
        setIsProcessing(false);
      } else {
        console.log(paymentIntent);
        alert(`Payment successful: ${message}`);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

const Chatbox: React.FC<ChatboxProps> = ({
  selectedConversation, 
  setSelectedConversation, 
  messages, 
  setMessages 
}) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const state = useSelector((state: RootState) => state);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(50.00); // Default amount
  const [message, setMessage] = useState("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleAmountChange = (operation) => {
    setAmount((prevAmount) => operation === "increment" ? prevAmount + 1 : prevAmount - 1);
  };


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const createPaymentIntent = async (amount) => {
    const response = await axios.post(`${config.get('API')}/payments/create-payment-intent`, { amount });
    return response.data.client_secret;
  };

  const refundPayment = async (paymentIntentId, amount) => {
    const response = await axios.post(`${config.get('API')}/payments/refund-payment`, { paymentIntentId, amount });
    return response.data;
  };

  const getMessages = async (conversationId) => {
    try {
      const response = await axios.get(`${config.get('API')}/messenger/conversation/${conversationId}`);
      return response.data.messages || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await axios.post(`${config.get('API')}/messenger/send-message`, {
        senderId: state.auth.user.UserId,
        receiverId: selectedConversation.otherUserId,
        conversationId: selectedConversation.conversationId,
        messageContent: newMessage,
      });
      setNewMessage("");
      const updatedMessages = await getMessages(selectedConversation.conversationId);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
    } else {
      try {
        const clientSecret = await createPaymentIntent(amount);
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          console.error('Error confirming card payment:', confirmError);
        } else {
          console.log('Payment confirmed successfully:', paymentIntent);
          setPaymentIntentId(paymentIntent.id);
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
      }
    }

    closeModal();
  };

  const handleRefund = async () => {
    try {
      const response = await refundPayment(paymentIntentId, refundAmount);
      console.log('Refund successful:', response);
    } catch (err) {
      console.error('Error refunding payment:', err);
    }
  };

  const renderMessages = () => {
    if (!messages.length) return null;

    const renderedMessages = [];
    let lastDate = null;
    const sortedMessages = messages.slice().sort((a, b) => a.Timestamp - b.Timestamp);

    sortedMessages.forEach((message, index) => {
      const messageDate = new Date(message.Timestamp).toLocaleDateString();

      if (messageDate !== lastDate) {
        renderedMessages.push(
          <div key={`date-${index}`} className="text-center text-sm text-gray-400 my-2">
            {messageDate}
          </div>
        );
        lastDate = messageDate;
      }

      renderedMessages.push(
        <div key={index} className={`flex ${message.UserId === state.auth.user.UserId ? 'justify-end' : 'justify-start'}`}>
          <div className="bg-gray-700 text-white p-2 rounded-md max-w-xs">
            {message.MessageContent}
          </div>
          <div className="text-xs text-gray-400 ml-2">
            {new Date(message.Timestamp).toLocaleTimeString()}
          </div>
        </div>
      );
    });

    return renderedMessages;
  };

  const handleCloseConversation = () => {
    setSelectedConversation(null);
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {selectedConversation && (
        <div className="message-details">
          <button className="close-button" onClick={handleCloseConversation}>×</button>
          <h2>Conversation with {selectedConversation.otherUserId}</h2>
          <div className="chat" style={{ minHeight: '300px' }}>
            {renderMessages()}
          </div>
          <div className="message-input-container">
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <button onClick={sendMessage}>Send</button>
              <button onClick={openModal}>Send Paid Message</button>
            </div>
          </div>
        </div>
      )}

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Stripe Payment Modal"
      >
        <h2>Add Tip</h2>
        <div>
          <label>Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <button onClick={() => handleAmountChange("decrement")}>-</button>
          <span>{amount.toFixed(2)}</span>
          <button onClick={() => handleAmountChange("increment")}>+</button>
        </div>
        <Elements stripe={stripePromise}>
          <PaymentForm amount={amount} message={message} />
        </Elements>
        <button onClick={closeModal}>Close</button>
      </Modal> */}

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Stripe Payment Modal"
      >
        <div className="top">
          <div className="div">

            <div className="div">
              <div className="title-frame">
                <div className="title">
                  <div className="text-wrapper">Add Tip</div>
                </div>
                <img className="help-circle" alt="Help circle" src="help-circle.svg" />
              </div>
              <div className="title-wrapper">
                <div className="the-message-with-the-wrapper">
                  <p className="the-message-with-the">
                    The message with the highest bid will be prioritized at the top of the Partner&#39;s inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="div-2">
              <div className="price-service-fee">
                <div className="div-3">
                  <div className="title">
                    <div className="text-wrapper-2">Price</div>
                  </div>
                  <div className="title">
                    <div className="text-wrapper-3">$450.00</div>
                  </div>
                </div>
                <div className="div-3">
                  <div className="title">
                    <div className="text-wrapper-2">Service Fee (2.9%)</div>
                  </div>
                  <div className="title">
                    <div className="text-wrapper-3">$13.05</div>
                  </div>
                </div>
                <div className="div-3">
                  <div className="title">
                    <div className="text-wrapper-2">Tip</div>
                  </div>
                  <div className="title">
                    <div className="text-wrapper-3">$50.00</div>
                  </div>
                </div>
              </div>
              <div className="total">
                <div className="title">
                  <div className="text-wrapper-3">Total Amount</div>
                </div>
                <div className="title">
                  <div className="text-wrapper-4">$478.05</div>
                </div>
              </div>
            </div>
            <div className="frame">
              <div className="tip-amount">
                <div className="div-wrapper">
                  <div className="text-wrapper-5">Tip Amount</div>
                </div>
                <div className="tip-container">
                  <div className="text-wrapper-6">$56.00</div>
                  <div className="text-wrapper-7">USD</div>
                </div>
              </div>
              <div className="tip-amount">
                <div className="title-2">
                  <div className="text-wrapper-8">(Highest Bid $55)</div>
                </div>
                <div className="tip-container-2">
                  <div className="text-wrapper-9">Match Bid</div>
                </div>
              </div>
            </div>
            <div className="div-2">
              <div className="message">
                <div className="title">
                  <div className="text-wrapper-10">Message</div>
                </div>
                <div className="message-2">
                  <p className="p">
                    “Hi Jaycen just wanted to see if you could help me out, i’ve seen you in the studio with Sabrina lately
                    and wanted to send you a few files for your consideration. I Appreciate you!”
                  </p>
                </div>
              </div>
            </div>
            <button className="button">
              <div className="title-3">
                <div className="text-wrapper-11">Proceed Payment</div>
              </div>
            </button>
          </div>
        </div>
      </Modal> */}

      
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Stripe Payment Modal"
      >
        <h2>Confirm Payment</h2>
        <form onSubmit={handlePayment}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(20)}
              required
            />
          </label>
          <CardElement options={cardElementOptions} />
          <button type="submit" disabled={!stripe || !elements}>Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
        <h2>Refund Payment</h2>
        <div>
          <label>
            Refund Amount:
            <input
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
            />
          </label>
          <button onClick={handleRefund}>Refund</button>
        </div>
      </Modal>


      
      <style>{`
        .message-details {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 20px;
          background-color: #1e1e1e;
          color: #fff;
          overflow-y: auto;
          box-sizing: border-box;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5em;
          cursor: pointer;
        }
        .chat {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background-color: #1e1e1e;
        }
        .message-input-container {
          display: flex;
          justify-content: flex-end;
          padding: 10px;
          background-color: #1e1e1e;
          border-top: 1px solid #333;
          box-sizing: border-box;
        }
        .message-input {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .message-input input {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 5px;
          margin-right: 10px;
        }
        .message-input button {
          padding: 10px 20px;
          background-color: #33ff33;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

.top {
  align-items: flex-start;
  background-color: #1b1b1b;
  border: 1px solid;
  border-color: #68717e;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 20px;
  position: relative;
}

.top .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.top .title-frame {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 4px 0px;
  position: relative;
  width: 100%;
}

.top .title {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.top .text-wrapper {
  color: #ffffff;
  font-family: "Mona Sans-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.top .help-circle {
  height: 20px;
  position: relative;
  width: 20px;
}

.top .title-wrapper {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.top .the-message-with-the-wrapper {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
  width: 100%;
}

.top .the-message-with-the {
  color: #b9b9b9;
  flex: 1;
  font-family: "Mona Sans-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  text-align: justify;
}

.top .div-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  position: relative;
  width: 100%;
}

.top .price-service-fee {
  align-items: flex-start;
  align-self: stretch;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #242424;
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0px;
  position: relative;
  width: 100%;
}

.top .div-3 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.top .text-wrapper-2 {
  color: #b9b9b9;
  font-family: "Mona Sans-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}

.top .text-wrapper-3 {
  color: #b9b9b9;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}

.top .total {
  align-items: flex-start;
  align-self: stretch;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #242424;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 8px 0px;
  position: relative;
  width: 100%;
}

.top .text-wrapper-4 {
  color: #00e124;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}

.top .frame {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  position: relative;
  width: 100%;
}

.top .tip-amount {
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

.top .div-wrapper {
  align-items: center;
  display: inline-flex;
  gap: 10px;
  height: 23px;
  justify-content: center;
  position: relative;
}

.top .text-wrapper-5 {
  color: #b9b9b9;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: fit-content;
}

.top .tip-container {
  align-items: center;
  align-self: stretch;
  background-color: #161616;
  border: 1px solid;
  border-color: #2c2c2c;
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 8px 12px;
  position: relative;
  width: 100%;
}

.top .text-wrapper-6 {
  color: #c8c8c8;
  flex: 1;
  font-family: "Mona Sans-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
}

.top .text-wrapper-7 {
  color: #848484;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}

.top .title-2 {
  align-items: center;
  display: flex;
  gap: 10px;
  height: 23px;
  position: relative;
  width: 90px;
}

.top .text-wrapper-8 {
  color: #727272;
  font-family: "Mona Sans-MediumItalic", Helvetica;
  font-size: 10px;
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.top .tip-container-2 {
  align-items: center;
  align-self: stretch;
  background-color: #9eff00;
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  padding: 8px 12px;
  position: relative;
  width: 100%;
}

.top .text-wrapper-9 {
  color: #000000;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}

.top .message {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
}

.top .text-wrapper-10 {
  color: #b9b9b9;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}

.top .message-2 {
  align-items: center;
  align-self: stretch;
  background-color: #161616;
  border: 1px solid;
  border-color: #2c2c2c;
  border-radius: 8px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 8px 16px;
  position: relative;
  width: 100%;
}

.top .p {
  color: #777777;
  flex: 1;
  font-family: "Mona Sans-Italic", Helvetica;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
}

.top .button {
  all: unset;
  align-items: center;
  align-self: stretch;
  background-color: #9eff00;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  gap: 12px;
  height: 36px;
  justify-content: center;
  padding: 8px;
  position: relative;
  width: 100%;
}

.top .title-3 {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  position: relative;
  width: 112px;
}

.top .text-wrapper-11 {
  color: #000000;
  font-family: "Mona Sans-Medium", Helvetica;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-left: -3.5px;
  margin-right: -3.5px;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}


      `}</style>
      </>
  );
};

export default Chatbox;
