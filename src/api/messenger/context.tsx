import { ISendMessage, useSendMessage } from './hooks/useSendMessage';
import { useDeleteConversations } from './hooks/useDeleteConversations';
import { useGetConversationNotes } from './hooks/useGetConversationNotes';
import { IReplyInThread, useReplyInThread } from './hooks/useReplyInThread';
import { IGetConversationMessages, useGetConversationMessages } from './hooks/useGetConversationMessages';
import { useToggleConversationIsSpam } from './hooks/useToggleConversationIsSpam';
import { IAddReaction, useAddReactionMessage } from './hooks/useAddReactionMessage';
import { IGetConversations, useGetConversations } from './hooks/useGetConversations';
import { IConversation, IMessage, INotes  } from 'api/messenger/objects/states.types';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { IGetThreadMessages, ThreadMessagesResponse, useGetThreadMessages } from './hooks/useGetThreadMessages';
import { useToggleConversationIsArchive } from './hooks/useToggleConversationIsArchive';
import { useGetSearchMessages, ISearchMessagesParams } from './hooks/useGetSearchMessage';
import { useToggleConversationIsPriority } from './hooks/useToggleConversationIsPriority';
import { IToggleMessageRead, useToggleMessageIsRead } from './hooks/useToggleMessageIsRead';
import { IDeleteReaction, useDeleteReactionMessage } from './hooks/useDeleteReactionMessage';
import { IAddConversationNote, useAddConversationNote } from './hooks/useAddConversationNote';
import { IUpdateConversationNote,useUpdateConversationNote} from './hooks/useUpdateConversationNote';
import { IDeleteConversationNote, useDeleteConversationNote } from './hooks/useDeleteConversationNote';
import { IToggleConversationFavorite, useToggleConversationFavorite } from './hooks/useToggleConversationFavorite';
import { IGetTotalConversationUnread, useGetTotalConversationUnread } from './hooks/useGetTotalConversationUnread';
import { 
  IToggleConversationIsArchived, 
  IToggleConversationIsPriority, 
  IToggleConversationIsSpam,
  IGetConversationNotes,
  IDeleteConversations,
  IDeleteMessage,
} from './objects/api.interfaces';
import { useDeleteMessage } from './hooks/useDeleteMessage';

interface MessengerContextType {
  // State
  activeConversation: IConversation | null;
  messages: IMessage[] | null;
  loading: boolean;
  error: string | null;
  conversations: IConversation[];
  setConversations: React.Dispatch<React.SetStateAction<IConversation[]>>;
  searchMessages: IMessage[] | null;
  setSearchMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  loadingConversations: boolean;
  totalConversations: number;
  totalPriorityInboxUnread: number;
  totalGeneralInboxUnread: number;
  totalIcebreakerInboxUnread: number;
  totalSearchMessages: number;
  conversationNotes: INotes[];
  // Hooks
  addReactionMessage: (payload: IAddReaction) => Promise<void>;
  deleteReactionMessage: (payload: IDeleteReaction) => Promise<void>;
  setActiveConversation?: (conversation: IConversation) => void;
  getConversations: (payload: IGetConversations) => Promise<void>;
  toggleConversationIsArchived: (payload: IToggleConversationIsArchived) => Promise<void>;
  toggleConversationsIsSpam: (payload: IToggleConversationIsSpam) => Promise<void>;
  toggleConversationsIsPriority: (payload: IToggleConversationIsPriority) => Promise<void>;
  toggleMessageIsRead:(payload: IToggleMessageRead) => Promise<void>;
  getConversationMessages: (payload: IGetConversationMessages) => Promise<void>;
  getTotalConversationUnread: (payload: IGetTotalConversationUnread) => Promise<void>;
  getConversationNotes: (payload: IGetConversationNotes) => Promise<void>;
  addConversationNote: (payload: IAddConversationNote) => Promise<void>;
  deleteConversationNote: (payload: IDeleteConversationNote) => Promise<void>;
  updateConversationNote: (payload: IUpdateConversationNote) => Promise<void>;
  toggleConversationFavorite: (payload: IToggleConversationFavorite) => Promise<void>;
  deleteConversations: (payload: IDeleteConversations) => Promise<void>;
  getSearchMessages: (payload: ISearchMessagesParams) => Promise<void>;
  getThreadMessages: (payload: IGetThreadMessages) => Promise<ThreadMessagesResponse>;
  setTotalPriorityInboxUnread: (payload: number) => void;
  setTotalGeneralInboxUnread: (payload: number) => void;
  setTotalIcebreakerInboxUnread: (payload: number) => void;
  threadMessages: IMessage[] | null;
  setThreadMessages: (messages: IMessage[]) => void;
  setMessages: (messages: IMessage[]) => void;
  sendMessage: (payload: ISendMessage) => Promise<void>;
  replyInThread: (payload: IReplyInThread) => Promise<void>;
  deleteMessage: (payload: IDeleteMessage) => Promise<any>;
}

const MessengerContext = createContext<MessengerContextType | undefined>(undefined);

export const useMessenger = () => {
  const context = useContext(MessengerContext);
  if (context === undefined) {
    throw new Error('useMessenger must be used within a MessengerProvider');
  }
  return context;
};

interface MessengerProviderProps {
  children: ReactNode;
}

export const MessengerProvider: React.FC<MessengerProviderProps> = ({ children }) => {
  // States
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [threadMessages, setThreadMessages] = useState<IMessage[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchMessages, setSearchMessages] = useState<IMessage[] | null>(null);
  const [totalSearchMessages,setTotalSearchMessages] = useState<number>(0);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [conversationNotes, setConversationNotes] = useState<INotes[]>([]);
  const [activeConversation, setActiveConversation] = useState<IConversation | null>(null);
  const [loadingConversations, setLoadingConversations] = useState<boolean>(false);
  const [totalConversations, setTotalConversations] = useState<number>(0);
  const [totalPriorityInboxUnread, setTotalPriorityInboxUnread] = useState<number>(0);
  const [totalGeneralInboxUnread, setTotalGeneralInboxUnread] = useState<number>(0);
  const [totalIcebreakerInboxUnread, setTotalIcebreakerInboxUnread] = useState<number>(0);

  // Define Hooks
  const getConversationsFunc = 
    useGetConversations(setConversations, setTotalConversations);
  const getConversationMessagesFunc = 
    useGetConversationMessages(setMessages);
  const getConversationNotesFunc = 
    useGetConversationNotes(setConversationNotes);
  const getTotalConversationUnreadFunc = 
    useGetTotalConversationUnread(
      setTotalPriorityInboxUnread, 
      setTotalGeneralInboxUnread, 
      setTotalIcebreakerInboxUnread
    );

  const toggleConversationIsArchivedFunc = 
    useToggleConversationIsArchive();
  const toggleConversationsIsSpamFunc = 
    useToggleConversationIsSpam();
  const toggleConversationsIsPriorityFunc = 
    useToggleConversationIsPriority();
  const toggleConversationFavoriteFunc = 
    useToggleConversationFavorite();
    //notes
  
  const addConversationNoteFunc = 
    useAddConversationNote(setConversationNotes);
  const deleteConversationNoteFunc = 
    useDeleteConversationNote();
  const updateConversationNoteFunc = 
    useUpdateConversationNote();
  const deleteConversationsFunc = 
    useDeleteConversations();
  const toggleMessageIsReadFunc = useToggleMessageIsRead();
  const getThreadMessagesFunc = useGetThreadMessages(setThreadMessages);
  const addReactionMessageFunc = useAddReactionMessage();
  const deleteReactionMessageFunc = useDeleteReactionMessage();
  const sendMessageFunc = useSendMessage(setMessages);
  const replyInThreadFunc = useReplyInThread(setThreadMessages);
  const getSearchMessagesFunc = 
    useGetSearchMessages(setSearchMessages,setTotalSearchMessages);
  const deleteMessageFunc = useDeleteMessage();

  const value: MessengerContextType = useMemo(() => {
    return {
      activeConversation,
      messages,
      loading,
      error,
      setActiveConversation,
      conversations,
      setConversations,
      searchMessages,
      setSearchMessages,
      loadingConversations,
      totalConversations,
      totalPriorityInboxUnread,
      totalGeneralInboxUnread,
      totalIcebreakerInboxUnread,
      setTotalPriorityInboxUnread,
      setTotalGeneralInboxUnread,
      setTotalIcebreakerInboxUnread,
      totalSearchMessages,
      conversationNotes,
      getConversations: getConversationsFunc,
      toggleConversationIsArchived: toggleConversationIsArchivedFunc,
      toggleConversationsIsSpam: toggleConversationsIsSpamFunc,
      toggleConversationsIsPriority: toggleConversationsIsPriorityFunc,
      toggleMessageIsRead: toggleMessageIsReadFunc,
      getConversationMessages: getConversationMessagesFunc,
      getTotalConversationUnread: getTotalConversationUnreadFunc,
      getConversationNotes: getConversationNotesFunc,
      addConversationNote: addConversationNoteFunc,
      deleteConversationNote: deleteConversationNoteFunc,
      updateConversationNote: updateConversationNoteFunc,
      toggleConversationFavorite: toggleConversationFavoriteFunc,
      deleteConversations: deleteConversationsFunc,
      getSearchMessages: getSearchMessagesFunc,
      getThreadMessages: getThreadMessagesFunc,
      addReactionMessage: addReactionMessageFunc,
      deleteReactionMessage: deleteReactionMessageFunc,
      threadMessages,
      setThreadMessages,
      setMessages,
      sendMessage: sendMessageFunc,
      replyInThread: replyInThreadFunc,
      deleteMessage: deleteMessageFunc
    };
  }, [
    activeConversation,
    messages,
    loading,
    error,
    setActiveConversation,
    conversations,
    setConversations,
    searchMessages,
    setSearchMessages,
    loadingConversations,
    totalConversations,
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
    setTotalPriorityInboxUnread,
    setTotalGeneralInboxUnread,
    setTotalIcebreakerInboxUnread,
    totalSearchMessages,
    conversationNotes,
    getConversationsFunc,
    toggleConversationIsArchivedFunc,
    toggleConversationsIsSpamFunc,
    toggleConversationsIsPriorityFunc,
    toggleMessageIsReadFunc,
    getConversationMessagesFunc,
    getTotalConversationUnreadFunc,
    getConversationNotesFunc,
    addConversationNoteFunc,
    deleteConversationNoteFunc,
    updateConversationNoteFunc,
    toggleConversationFavoriteFunc,
    deleteConversationsFunc,
    getSearchMessagesFunc,
    getThreadMessagesFunc,
    addReactionMessageFunc,
    deleteReactionMessageFunc,
    threadMessages,
    setThreadMessages,
    setMessages,
    sendMessageFunc,
    replyInThreadFunc,
    deleteMessageFunc
  ]);

  return (
    <MessengerContext.Provider value={value}>
      {children}
    </MessengerContext.Provider>
  );
}; 