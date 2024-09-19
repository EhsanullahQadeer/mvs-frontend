/*************************************************************************
 * @file Inbox.types.ts
 * @author End Quote
 * @desc Props for the Inbox component.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

export interface ChatboxProps {
  selectedConversation: any,
  messages: any;
  setMessages: (messages: any) => void;
  recipientId: string,
  conversationId: string,
}