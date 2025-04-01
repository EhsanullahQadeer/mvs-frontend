import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useMessenger } from 'api/messenger/context';
import { checkPendingConnectAPI, checkUserHasStripeConnectedAccount } from 'api/user';
import { IConversation, IMessage, INotes, TUser } from 'api/messenger/objects/states.types';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';

type ChatTabType = 'messages' | 'info' | 'notes';
type ConnectionDetail = false | null | 'pending' | undefined | true;

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
  connectionStatus: ConnectionDetail;
  setConnectionStatus: (status: ConnectionDetail) => void;
  listenToDemoEvent: boolean;
  setListenToDemoEvent: (listenedToDemoEvent: boolean) => void;
  onlyAllowAudioRecording: boolean;
  setOnlyAllowAudioRecording: (onlyAllowAudioRecording: boolean) => void;
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
  hasListenedToDemo: boolean;
  setHasListenedToDemo: (hasListened: boolean) => void;
  markMessageAsRead: (id:number)=> void;
  LIMIT_MESSAGES: number;
  isSendDemoAvailable: boolean;
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
    setThreadMessages,
    toggleMessageIsRead,
    setMessages
  } = useMessenger();

  const [activeTab, setActiveTab] = useState<ChatTabType>('messages');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionDetail>(undefined);
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<IMessage[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<TUser>(activeConversation?.recipient || null);
  const [totalPaid, setTotalPaid] = useState<number>(activeConversation?.total_paid || 0);
  const [notes, setNotes] = useState<INotes[]>(conversationNotes);
  const [isThread, setIsThread] = useState<boolean>(false); // Todo: implement the new haslistened to demo var

  const [hasListenedToDemo, setHasListenedToDemo] = useState<boolean>(false);
  const [listenToDemoEvent, setListenToDemoEvent] = useState<boolean>(false);
  const [onlyAllowAudioRecording, setOnlyAllowAudioRecording] = useState<boolean>(false);

  const [isSendDemoAvailable, setIsSendDemoAvailable] = useState<boolean>(false);
  const LIMIT_MESSAGES = 100;

  let onMessageReadTimeout;
  const updateMessageReadIds = useRef<number[]>([]);

  useEffect(() => {
    if (recipient) {
      checkUserHasStripeConnectedAccount(recipient.id)
        .then((res) => {
          //console.log('res', res);
          setIsSendDemoAvailable(res.data || false);
        })
        .catch((error) => {
          console.error('Error checking Stripe account:', error);
          setIsSendDemoAvailable(false);
        });
    } else {
      setIsSendDemoAvailable(false);
    }
    //console.log('Checking connection with user: ', recipient.id);
    fetchConnectionStatus(recipient.id)
  }, [recipient]);

  async function markMessageAsRead(id:number){
    clearTimeout(onMessageReadTimeout);
    updateMessageReadIds.current.push(id);
    onMessageReadTimeout= setTimeout(()=> {
      if (updateMessageReadIds.current.length === 0) return;
      toggleMessageIsRead({messageIds:updateMessageReadIds.current});
      updateMessageReadIds.current = [];
    }, 5000);
  }

  const fetchConnectionStatus = async (id: number) => {
    //console.log('Fetching Connection status with user: ', id);
    try {
      const response = await checkPendingConnectAPI(id);
      //console.log('response: ', response);
      if(response.data.results.connectionDetails === null) {setConnectionStatus(null);}
      else {
        setConnectionStatus(
          response.data.results.connectionDetails.request_accepted
        );
      }
    } catch (error) {
      console.log("error while checking connection", error);
    }
  }

  const getConversationInfo = useCallback(async () => {
    if (activeConversation) {
      setTotalPaid(activeConversation.total_paid);
      setRecipient(activeConversation.recipient);
    }
    if (updateMessageReadIds.current.length > 0) {
      toggleMessageIsRead({messageIds:updateMessageReadIds.current});
      updateMessageReadIds.current = [];
    }
    setIsThread(false);
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
        getConversationMessages({ conversationId: activeConversation.conversation_id, limit: LIMIT_MESSAGES, cursor: 0 })
          .finally(() => {
            setLoading(false);
          });
      } else if (threadMessages?.[0]?.id && messages === null) {
        setThreadMessages(null);
        getThreadMessages({ 
          parentMessageId: threadMessages[0].id,
          limit: LIMIT_MESSAGES,
          cursor: undefined,
        })
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
    const fetchedNotes = await getConversationNotes({ conversationId: activeConversation?.id, ascending: true });
  }, [activeConversation]);

  const handleLoadThread = useCallback((parentMessageId: number) => {
    setThreadMessages(null);
    setIsThread(true);
    getThreadMessages({
      parentMessageId,
      limit: LIMIT_MESSAGES,
      cursor: undefined,
    });
  }, [getThreadMessages, setMessages, setIsThread]);

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
    connectionStatus,
    setConnectionStatus,
    refreshMessages,
    handleSendMessage,
    getNotes,
    getConversationInfo,
    handleLoadThread,
    isThread,
    setIsThread,
    hasListenedToDemo,
    setHasListenedToDemo,
    listenToDemoEvent,
    setListenToDemoEvent,
    onlyAllowAudioRecording,
    setOnlyAllowAudioRecording,
    markMessageAsRead,
    LIMIT_MESSAGES,
    isSendDemoAvailable
  };

  return (
    <ChatboxContext.Provider value={value}>
      {children}
    </ChatboxContext.Provider>
  );
};
