import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useMessenger } from 'api/messenger/context';
import { IConversation, IMessage, INotes, TUser } from 'api/messenger/objects/states.types';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
// import { useMessageReactions } from '../../hooks/useMessageReactions';

type ChatTabType = 'messages' | 'info' | 'notes';

interface ChatboxContextType {
  // State
  activeTab: ChatTabType;
  setActiveTab: (tab: ChatTabType) => void;
  chatMessages: IMessage[] | null;
  activeConversation: IConversation | null;
  loading: boolean;
  overlayLoading: boolean;
  setOverlayLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notes: any[];
  recipient: TUser;
  totalPaid: number;
    // messageReactions: any;
    // handleEmojiSelect: (id: number, emoji: string) => void;
  
  // Functions
  // canSendMessage: (hasText: boolean, tipAmount: number, thereIsDemo: boolean) => boolean;
  handleDemoBtn: (id: number) => void;
  handleReviewBtn: (id: number) => void;
  handleThreadReply: (id: number) => void;
  refreshMessages: () => void;
  handleSendMessage: (content: string, mediaId?: string) => Promise<void>;
  getNotes: () => Promise<void>;
  getConversationInfo: () => Promise<void>;
  handleLoadThread: (parentMessageId: number) => void;
  isThread: boolean;
  setIsThread: (isThread: boolean) => void;
}

const ChatboxContext = createContext<ChatboxContextType | undefined>(undefined);

export const useChatbox = () => {
  const context = useContext(ChatboxContext);
  if (context === undefined) {
    throw new Error('useChatbox must be used within a ChatboxProvider');
  }
  return context;
};

interface ChatboxProviderProps {
  children: ReactNode;
}

export const ChatboxProvider: React.FC<ChatboxProviderProps> = ({ children }) => {

  const authUser = useSelector((state: RootState) => state.auth?.user);
  const {
    messages,
    loading,
    getConversationMessages,
    conversationNotes,
    getThreadMessages,
    getConversationNotes,
    threadMessages,
    activeConversation
  } = useMessenger();

  const [activeTab, setActiveTab] = useState<ChatTabType>('messages');
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<IMessage[] | null>(null);

  const [recipient, setRecipient] = useState<TUser>(activeConversation?.recipient || null);
  const [totalPaid, setTotalPaid] = useState<number>(activeConversation?.total_paid || 0);
  const [notes, setNotes] = useState<INotes[]>(conversationNotes);
  const [isThread, setIsThread] = useState<boolean>(false);

  const getConversationInfo = useCallback(async () => {
    if (activeConversation) {
      setTotalPaid(activeConversation.total_paid);
      setRecipient(activeConversation.recipient);
    }
  }, [activeConversation]);
  
  useEffect(() => {
    if (messages) {
      setChatMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (notes) {
      setNotes(notes);
    }
  }, [notes]);

  // const canSendMessage = useCallback((hasText: boolean, tipAmount: number, thereIsDemo: boolean) => {
  //   if ( hasText && !thereIsDemo ) { return true }
  //   return false;
  // }, [activeConversation, authUser]);

  const findThreadReplyObj = useCallback((msgId: number) => {
    return Array.isArray(messages) ? 
      messages.filter(msg => msg.thread?.id === msgId) : [];
  }, [messages]);

  const refreshMessages = useCallback(() => {
    console.log('threadMessages', threadMessages);
    if (activeConversation) {
      if (!isThread) {
        setChatMessages(null);
        getConversationMessages({ conversationId: activeConversation.conversation_id });
      } else if (threadMessages?.[0]?.id) {
        getThreadMessages({ parentMessageId: threadMessages[0].id });
      }
    }
  }, [
    activeConversation, 
    getConversationMessages, 
    getThreadMessages, 
    isThread
  ]);

  const handleDemoBtn = useCallback((id: number) => {
    // Implementation for handling demo button click
    console.log('Demo button clicked for message:', id);
    // Add your implementation here
  }, []);

  const handleReviewBtn = useCallback((id: number) => {
    // Implementation for handling review button click
    console.log('Review button clicked for message:', id);
    // Add your implementation here
  }, []);

  const handleThreadReply = useCallback((id: number) => {
    // Implementation for handling thread reply
    console.log('Thread reply for message:', id);
    // Add your implementation here
  }, []);

  const handleSendMessage = useCallback(async (content: string, mediaId?: string) => {
    // Implementation for sending a message
    console.log('Sending message:', content, mediaId);
    // Add your implementation here

    refreshMessages();

  }, [refreshMessages]);

  const getNotes = useCallback(async () => {
    // Implementation for fetching notes
    console.log('Fetching notes for activeConversation:', activeConversation?.conversation_id);
    const fetchedNotes = await getConversationNotes({ conversationId: activeConversation?.id, ascending: true });
    console.log("fetchedNotes", fetchedNotes);
    // setNotes(fetchedNotes);
  }, [activeConversation]);

  const handleLoadThread = useCallback((parentMessageId: number) => {
    console.log('feedbackthread parentMessageId', parentMessageId);
    getThreadMessages({
      parentMessageId
    });
  }, [getThreadMessages]);

  useEffect(() => {
    console.log('messagessdfdsf', messages);
  }, [messages]);

  
  useEffect(() => {
    if (activeConversation) {
      refreshMessages();
      getNotes();
    }
  }, [activeConversation, refreshMessages, getNotes]);

  const value: ChatboxContextType = {
    activeTab,
    setActiveTab,
    activeConversation,
    loading,
    overlayLoading,
    setOverlayLoading,
    notes,
    chatMessages,
    recipient,
    totalPaid,
    // messageReactions,
    // handleEmojiSelect,
    
    handleDemoBtn,
    handleReviewBtn,
    handleThreadReply,
    refreshMessages,
    handleSendMessage,
    getNotes,
    getConversationInfo,
    handleLoadThread,
    isThread,
    setIsThread
  };

  return (
    <ChatboxContext.Provider value={value}>
      {children}
    </ChatboxContext.Provider>
  );
};
