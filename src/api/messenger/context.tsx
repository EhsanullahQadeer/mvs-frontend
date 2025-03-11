import { useToggleMessageIsRead } from './hooks/useToggleMessageIsRead';
import { useDeleteConversations } from './hooks/useDeleteConversations';
import { useGetConversationNotes } from './hooks/useGetConversationNotes';
import { useGetConversationMessages } from './hooks/useGetConversationMessages';
import { useToggleConversationIsSpam } from './hooks/useToggleConversationIsSpam';
import { IGetConversations, useGetConversations } from './hooks/useGetConversations';
import { IConversation, IMessage, INotes  } from 'api/messenger/objects/states.types';
import { IGetThreadMessages, useGetThreadMessages } from './hooks/useGetThreadMessages';
import { useToggleConversationIsArchive } from './hooks/useToggleConversationIsArchive';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useGetSearchMessages, ISearchMessagesParams } from './hooks/useGetSearchMessage';
import { useToggleConversationIsPriority } from './hooks/useToggleConversationIsPriority';
import { IGetFavoritedConversations, useGetFavoritedConversations } from './hooks/useGetFavoritedConversations';
import { IToggleConversationFavorite, useToggleConversationFavorite } from './hooks/useToggleConversationFavorite';
import { IGetTotalConversationUnread, useGetTotalConversationUnread } from './hooks/useGetTotalConversationUnread';
import { IAddReaction, useAddReactionMessage } from './hooks/useAddReactionMessage';
import { IDeleteReaction, useDeleteReactionMessage } from './hooks/useDeleteReactionMessage';
import { IUpdateConversationNote,useUpdateConversationNote} from './hooks/useUpdateConversationNote';
import { IDeleteConversationNote, useDeleteConversationNote } from './hooks/useDeleteConversationNote';
import { IAddConversationNote, useAddConversationNote } from './hooks/useAddConversationNote';

import { 
  IToggleConversationIsArchived, 
  IToggleConversationIsPriority, 
  IToggleConversationIsSpam,
  IGetConversationMessages,
  IGetConversationNotes,
  IDeleteConversations,
  IToggleMessageRead,
  ISendMessage,
} from './objects/api.interfaces';
import { IReplyInThread, useReplyInThread } from './hooks/useReplyInThread';
import { useSendMessage } from './hooks/useSendMessage';

interface MessengerContextType {
  // State
  activeConversation: IConversation | null;
  messages: IMessage[] | null;
  loading: boolean;
  error: string | null;
  conversations: IConversation[];
  searchMessages: IMessage[] | null;
  setSearchMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  archivedConversations: IConversation[];
  favoriteConversations: IConversation[];
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
  getFavoritedConversations: (payload: IGetFavoritedConversations) => Promise<void>;
  deleteConversations: (payload: IDeleteConversations) => Promise<void>;
  getSearchMessages: (payload: ISearchMessagesParams) => Promise<void>;
  getThreadMessages: (payload: IGetThreadMessages) => Promise<void>;
  threadMessages: IMessage[] | null;
  setThreadMessages: (messages: IMessage[]) => void;
  setMessages: (messages: IMessage[]) => void;
  sendMessage: (payload: ISendMessage) => Promise<void>;
  replyInThread: (payload: IReplyInThread) => Promise<void>;
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
  const [archivedConversations, setArchivedConversations] = useState<IConversation[]>([]);
  const [favoriteConversations, setFavoriteConversations] = useState<IConversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState<boolean>(false);
  const [totalConversations, setTotalConversations] = useState<number>(0);
  const [totalPriorityInboxUnread, setTotalPriorityInboxUnread] = useState<number>(0);
  const [totalGeneralInboxUnread, setTotalGeneralInboxUnread] = useState<number>(0);
  const [totalIcebreakerInboxUnread, setTotalIcebreakerInboxUnread] = useState<number>(0);

  // Define Hooks
  const getConversationsFunc = 
    useGetConversations(setConversations, setTotalConversations);
  const toggleConversationIsArchivedFunc = 
    useToggleConversationIsArchive();
  const toggleConversationsIsSpamFunc = 
    useToggleConversationIsSpam();
  const toggleConversationsIsPriorityFunc = 
    useToggleConversationIsPriority();
  const getConversationMessagesFunc = 
    useGetConversationMessages(setMessages);
  const getTotalConversationUnreadFunc = 
    useGetTotalConversationUnread(
      setTotalPriorityInboxUnread, 
      setTotalGeneralInboxUnread, 
      setTotalIcebreakerInboxUnread
    );
    //notes
  const getConversationNotesFunc = 
    useGetConversationNotes(setConversationNotes);
  const addConversationNoteFunc = 
    useAddConversationNote(setConversationNotes);
  const deleteConversationNoteFunc = 
    useDeleteConversationNote();
  const updateConversationNoteFunc = 
    useUpdateConversationNote();
  const toggleConversationFavoriteFunc = 
    useToggleConversationFavorite();
  const getFavoritedConversationsFunc = 
    useGetFavoritedConversations(setConversations, setTotalConversations);
  const deleteConversationsFunc = 
    useDeleteConversations();
  const toggleMessageIsReadFunc = useToggleMessageIsRead();
  const getThreadMessagesFunc = useGetThreadMessages(setThreadMessages);

    
  const addReactionMessageFunc = useAddReactionMessage();
  const deleteReactionMessageFunc = useDeleteReactionMessage();
  const sendMessageFunc = useSendMessage();
  const replyInThreadFunc = useReplyInThread();
  const getSearchMessagesFunc = 
    useGetSearchMessages(setSearchMessages,setTotalSearchMessages);

  const value: MessengerContextType = {
    activeConversation,
    messages,
    loading,
    error,
    setActiveConversation,
    conversations,
    searchMessages,
    setSearchMessages,
    archivedConversations,
    favoriteConversations,
    loadingConversations,
    totalConversations,
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
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
    getFavoritedConversations: getFavoritedConversationsFunc,
    deleteConversations: deleteConversationsFunc,
    getSearchMessages: getSearchMessagesFunc,
    getThreadMessages: getThreadMessagesFunc,
    addReactionMessage: addReactionMessageFunc,
    deleteReactionMessage: deleteReactionMessageFunc,
    threadMessages,
    setThreadMessages,
    setMessages,
    sendMessage: sendMessageFunc,
    replyInThread: replyInThreadFunc
  };

  return (
    <MessengerContext.Provider value={value}>
      {children}
    </MessengerContext.Provider>
  );
}; 