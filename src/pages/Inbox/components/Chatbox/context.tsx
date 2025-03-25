import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useMessenger } from 'api/messenger/context';
import { IConversation, IMessage, INotes, TUser } from 'api/messenger/objects/states.types';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';
// import { useMessageReactions } from '../../hooks/useMessageReactions';

type ChatTabType = 'messages' | 'info' | 'notes';

interface ChatboxContextType {
  // State
  activeTab: ChatTabType;
  setActiveTab: (tab: ChatTabType) => void;
  chatMessages: IMessage[] | null;
  activeConversation: IConversation | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  overlayLoading: boolean;
  setOverlayLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notes: any[];
  recipient: TUser;
  totalPaid: number;
    // messageReactions: any;
    // handleEmojiSelect: (id: number, emoji: string) => void;
  
  // Functions
  refreshMessages: () => void;
  handleSendMessage: (content: string, mediaId?: string) => Promise<void>;
  getNotes: () => Promise<void>;
  getConversationInfo: () => Promise<void>;
  handleLoadThread: (parentMessageId: number) => void;
  isThread: boolean;
  setIsThread: (isThread: boolean) => void;
  markMessageAsRead: (id:number)=> void;
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
    getConversationMessages,
    conversationNotes,
    getThreadMessages,
    getConversationNotes,
    threadMessages,
    activeConversation,
    toggleMessageIsRead
  } = useMessenger();

  const [activeTab, setActiveTab] = useState<ChatTabType>('messages');
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<IMessage[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<TUser>(activeConversation?.recipient || null);
  const [totalPaid, setTotalPaid] = useState<number>(activeConversation?.total_paid || 0);
  const [notes, setNotes] = useState<INotes[]>(conversationNotes);
  const [isThread, setIsThread] = useState<boolean>(false);

  let onMessageReadTimeout;
  const updateMessageReadIds = useRef<number[]>([]);


  async function markMessageAsRead(id:number){
    clearTimeout(onMessageReadTimeout);
    updateMessageReadIds.current.push(id);
    onMessageReadTimeout= setTimeout(()=> {
      if (updateMessageReadIds.current.length === 0) return;
      toggleMessageIsRead({messageIds:updateMessageReadIds.current});
      updateMessageReadIds.current = [];
    },5000);
  }

  useEffect(() => {
    if (updateMessageReadIds.current.length > 0) {
      toggleMessageIsRead({messageIds:updateMessageReadIds.current});
      updateMessageReadIds.current = [];
    }
    setIsThread(false);
  }, [activeConversation]);

  const getConversationInfo = useCallback(async () => {
    if (activeConversation) {
      setTotalPaid(activeConversation.total_paid);
      setRecipient(activeConversation.recipient);
    }
  }, [activeConversation]);
  
  useEffect(() => {
    if (messages === null) {
      setChatMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (notes) {
      setNotes(notes);
    }
  }, [notes]);

  const findThreadReplyObj = useCallback((msgId: number) => {
    return Array.isArray(messages) ? 
      messages.filter(msg => msg.thread?.id === msgId) : [];
  }, [messages]);

  const refreshMessages = useCallback(() => {
    if (activeConversation) {
      setLoading(true);
      if (!isThread) {
        setChatMessages(null);
        getConversationMessages({ conversationId: activeConversation.conversation_id, limit: 10, cursor: 0 })
          .finally(() => {
            setLoading(false);
          });
      } else if (threadMessages?.[0]?.id) {
        getThreadMessages({ parentMessageId: threadMessages[0].id })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [
    activeConversation, 
    getConversationMessages, 
    getThreadMessages, 
    isThread
  ]);

  const handleSendMessage = useCallback(async (content: string, mediaId?: string) => {
    console.log('Sending message:', content, mediaId);
    refreshMessages();
  }, [refreshMessages]);

  const getNotes = useCallback(async () => {
    // Implementation for fetching notes
    //console.log('Fetching notes for activeConversation:', activeConversation?.conversation_id);
    const fetchedNotes = await getConversationNotes({ conversationId: activeConversation?.id, ascending: true });
    //console.log("fetchedNotes", fetchedNotes);
    // setNotes(fetchedNotes);
  }, [activeConversation]);

  const handleLoadThread = useCallback((parentMessageId: number) => {
    console.log('feedbackthread parentMessageId', parentMessageId);
    getThreadMessages({
      parentMessageId
    });
  }, [getThreadMessages]);
  
  // useEffect(() => {
  //   if (activeConversation) {
  //     setLoading(true);
  //     Promise.all([
  //       refreshMessages(),
  //       getNotes()
  //     ]).finally(() => {
  //       setLoading(false);
  //     });
  //   }
  // }, [activeConversation, refreshMessages, getNotes]);

  const value: ChatboxContextType = {
    activeTab,
    setActiveTab,
    activeConversation,
    loading,
    setLoading,
    overlayLoading,
    setOverlayLoading,
    notes,
    chatMessages,
    recipient,
    totalPaid,
    // messageReactions,
    // handleEmojiSelect,
  
    refreshMessages,
    handleSendMessage,
    getNotes,
    getConversationInfo,
    handleLoadThread,
    isThread,
    setIsThread,
    markMessageAsRead
  };

  return (
    <ChatboxContext.Provider value={value}>
      {children}
    </ChatboxContext.Provider>
  );
};
