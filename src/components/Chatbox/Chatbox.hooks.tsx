/*************************************************************************
 * @file Chatbox.hooks.tsx
 * @author End Quote
 * @desc Manages the Chatbox component states and hooks.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

/* LOCAL IMPORTS */
import { handlePaymentIntentAPI } from "api/stripe";
import { uploadAudioFile } from "api/sounds";
import axios from "api/axios";
import { config } from "config/ConfigManager";
import { Stripe } from "@stripe/stripe-js/types/stripe-js/stripe";
import { StripeElements } from "@stripe/stripe-js/types/stripe-js/elements-group";
import { getMessages, sendMessage } from "api/messenger";

export const useChatboxHooks = (
  setMessages
) => {

  /* States */
  const [newMessage, setNewMessage] = useState("");
  const state = useSelector((state: RootState) => state);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [amount, setAmount] = useState(50.00);
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [fileUrl, setFileUrl] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileWarning, setShowFileWarning] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [confirmPaymentIsOpen, setConfirmPaymentIsOpen] = useState(false);
  const [focusedPaymentIntent, setFocusPaymentIntent] = useState('');


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [user, setUser] = useState('');




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

  const sendMessageWithDemoTrack = async (
    stripe: Stripe | null,
    elements: StripeElements | null,
    conversationId: string,
    recipientId: string,
  ) => {
    // Avoid empty messages. TODO: warn user of empty message
    if ( newMessage.trim() === "" ) return;

    ///* Upload demo track to S3
    const fileURL = await uploadAudioFile( selectedFile );
    if (fileURL == null) return;

    /* Start of new conversation */
    if (conversationId = null){
      
      return;
    }
    
    /* Create payment intent */
    const { clientSecret, paymentIntentId } = 
      await handlePaymentIntentAPI( stripe, elements, amount);

    // TODO: report to user that an error occurred
    if (clientSecret == null) return;

    try {
      await sendMessage({
        // General info
        senderUserId: state?.auth?.user?.UserId,
        recipientUserId: recipientId,
        conversationId: conversationId,
        message: newMessage,
        // Demo content
        fileURL: fileURL,
        paymentIntentId: paymentIntentId,
        clientSecret: clientSecret,
        paymentProcessed: false, // Creator sends payment
        // Accept transaction
        audioURL: null // Set to null to indicate message containing demo
      });
      /* Cleanup */
      setNewMessage("");
      const updatedMessages = await getMessages(conversationId);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message:', error);
      // TODO: Delete recently uploaded file or keep and retry later
    }
  };

  const sendMessageWithAudioFile = async (
    stripe: Stripe | null,
    elements: StripeElements | null,
    conversationId: string,
    recipientId: string,
    audioURL: string,
  ) => {

    /// Make sure Partner has recorded a response
    if ( audioURL == null ) return;

    ///* Upload demo track to S3
    const fileURL = await uploadAudioFile( fileUrl );
    if (fileURL == null) return;

    try{
      await sendMessage({
        // General info
        senderUserId: state?.auth?.user?.UserId,
        recipientUserId: recipientId,
        conversationId: conversationId,
        message: newMessage,
        // Demo content
        fileURL: null, // Set to null to indicate message containing audio response
        paymentIntentId: paymentIntentId,
        clientSecret: null,
        paymentProcessed: true, // Partner receives payment
        // Accept transaction
        audioURL: audioURL
      });

      /// At this stage, the message was sent successfully 

    } catch( error ) {
      console.log( error )
    }
  }

  const openUploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/mp3,audio/wav';
    
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setAudioURL(audioURL);
    };

    input.click();
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Media devices not supported.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        const audioData = event.data;
        setAudioBlob(audioData);
        const audioUrl = URL.createObjectURL(audioData);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioURL(null);
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  };


  const handleConfirmPayment = async (
    recipientId,
    conversationId,
    paymentIntentId
  ) => {
    try {
      const response = await axios.post( `${config.get('API')}/payments/confirm-payment-intent`, {
        paymentIntentId: paymentIntentId
      });

      // The payment was succesfully processed
      if ( response.status === 200 ) {
        await sendMessage({
          // General info
          senderUserId: state?.auth?.user?.UserId,
          recipientUserId: recipientId,
          conversationId: conversationId,
          message: null, // TODO: future - we will allow users to send messages along the audio message
          // Demo content
          fileURL: null, // Set to null to indicate message containing audio response
          paymentIntentId: null,
          clientSecret: null,
          paymentProcessed: false, // Creator sends payment
          // Accept transaction
          audioURL: audioURL
        });

      } else {
        console.log('Payment not successful:', response);
      }
      
    } catch (error) {
      // Catch if confirm-payment-intent or sendMessage failed
      console.error('Error confirming payment:', error);
    }
  };

  const renderConversationMessages = (
    messages: any
  ) => {
    if (!messages.length) return <p>No messages yet. Start the conversation!</p>;
    const renderedMessages = [];
    let lastDate = null;


    messages.reverse().forEach((
      message, 
      index
    ) => {
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
        <div key={index} className="flex items-start mb-4">
          <img
            src={message.profilePicture}
            alt={message.username}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="bg-gray-700 text-white p-3 rounded-lg max-w-md">
            <div className="flex items-center mb-2">
              <span className="font-bold text-white mr-2">{message.username}</span>
              <span className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
            <p className="mb-2">{message.MessageContent}</p>

            {/* Message contains demo track */}
            {message.clientSecret && (
              <button
                className="bg-blue-500 text-white p-1 rounded-md mt-2"
                onClick={ () =>{
                  setConfirmPaymentIsOpen(true);
                  setFocusPaymentIntent(message.paymentIntentId);
                }
                }
              >
                Confirm Payment
              </button>
            )}

            {/* Message contains audio response
            {message.audioFile && (
              <button
                className="bg-blue-500 text-white p-1 rounded-md mt-2"
                onClick={() => handleConfirmPayment(message.paymentIntentId)}
              >
                Confirm Payment
              </button>
            )} */}



          </div>
        </div>
      );
    });

    return renderedMessages;
  };

  return ({
    newMessage, setNewMessage,
    modalIsOpen, setModalIsOpen,
    renderConversationMessages,
    sendMessageWithDemoTrack,
    recording, startRecording, stopRecording, deleteRecording,
    audioBlob, fileUrl, audioRef,
    audioURL, openModal, closeModal,
    confirmPaymentIsOpen, handleConfirmPayment,
    focusedPaymentIntent
  });
};
