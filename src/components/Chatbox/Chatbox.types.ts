/*************************************************************************
 * @file Chatbox.types.ts
 * @author End Quote
 * @desc Props for the Chatbox component.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/


export interface ChatboxProps {
  selectedConversation: any,
  messages: any;
  setMessages: (messages: any) => void;
  recipientId: string,
  conversationId: string,
  RecipientProfile: any,
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}