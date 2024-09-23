/*************************************************************************
 * @file InboxPage.tsx
 * @author End Quote
 * @desc Component for displaying and managing user messages and 
 *       conversations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { 
  useEffect, 
  useRef, 
  useState 
} from "react";
import Theme from "theme";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

/* LOCAL IMPORTS */
import { config } from "config/ConfigManager";
import Chatbox from "../../components/Chatbox";
import { useInboxHooks } from "./Inbox.hooks";

/* STRIPE CONFIG */
const stripePromise = loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'));

const InboxPage = (
  
) => {

  // States and Hooks
  const {
    state,
    selectedConversation, setSelectedConversation,
    conversationsList, setConversationsList,
    messages, setMessages,
    sortOption, setSortOption,
    handleSortChange,
    handleConversationClick,
  } = useInboxHooks();

  const Dropdown = ({
    label, 
    options,
    selectedOption, 
    onOptionChange 
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleOptionClick = (option) => {
      onOptionChange(option);
      setIsOpen(false);
    };

    useEffect(() => {
      if (buttonRef.current) {
      }
    }, []);

    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          {label} {selectedOption} ▼
        </button>
        {isOpen && (
          <ul className="absolute top-full left-0 bg-gray-900 text-white mt-1 rounded shadow-md min-w-full z-10">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <Theme>
    <Elements stripe={stripePromise}>

      <div className="flex flex-row">
        <div
          className="flex flex-col"
          style={{
            background: "#1f1f1f",
            height: "100vh", // Set height to 100% of the viewport height
            width: "200%", // Or any percentage that looks good on your screen
          }}
        >
          {/* Title */}
          <div className="p-4">
            <h3 className="text-2xl text-white font-semibold">
              Messages
            </h3>
          </div>

          {/* Search Function */}
          <div>
            <div className="ml-4">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-[400px]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={25}
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M21 21.5L16.7 17.2M19 11.5C19 15.9183 15.4183 19.5 11 19.5C6.58172 19.5 3 15.9183 3 11.5C3 7.08172 6.58172 3.5 11 3.5C15.4183 3.5 19 7.08172 19 11.5Z"
                      stroke="#4C4C4C"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-900 border border-gray-700 text-gray-400 text-sm rounded-full w-full h-[45px] pl-10 py-2.5"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>


          <Dropdown
            label="Sort by:"
            options={['Newest', 'Oldest', 'Highest Bid', 'Lowest Bid']}
            selectedOption={sortOption}
            onOptionChange={handleSortChange}
          />

          <div className="mt-4 flex-1 overflow-y-auto">
            {/* TEMPORARY, REMOVE LATER */}
            {Array.from({ length: 5 }).map((_, repeatIndex) => (
              <React.Fragment key={`repeat-${repeatIndex}`}>
                {conversationsList.map((conversation, index) => (
                  <div
                    className="hover:bg-gray-800 p-4 cursor-pointer flex items-center"
                    key={`${repeatIndex}-${index}`}
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <input type="checkbox" className="mr-4" />
                    <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white mr-4">
                      {conversation.otherUserId.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <span className="message-name text-white mr-4">{conversation.otherUserId}</span>
                        <span className="text-green-500 mr-4">$0.00</span>
                      </div>
                      {/* Latest Message */}
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-white mr-4">
                        {conversation.latestMessage.MessageContent}
                      </div>
                      <span className="text-gray-400 text-center mr-4">
                        {new Date(conversation.latestMessage.Timestamp).toLocaleDateString()} {new Date(conversation.latestMessage.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-red-500">Priority</span>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Chatbox container */}
        <div className="flex-1">
         <Chatbox
            selectedConversation={selectedConversation}
            messages={messages}
            setMessages={setMessages}
            recipientId={selectedConversation?.otherUserId}
            conversationId={selectedConversation?.conversationId} 
            RecipientProfile={undefined}
          />
        </div>

      </div>
      </Elements>
    </Theme>
  );
};

export default InboxPage;
