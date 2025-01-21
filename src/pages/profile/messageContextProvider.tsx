// MessageContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context's data
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface MessageContextType {
  message: Message[];
  sendMessage: (message: Message) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Create a provider component
export const MessageContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [message, setMessages] = useState<Message[]>([]);

  const sendMessage = (message: Message) => {
    console.log("Message sent: " + message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <MessageContext.Provider value={{ message, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = React.useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageContextProvider");
  }
  return context;
};
