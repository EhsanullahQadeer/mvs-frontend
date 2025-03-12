import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useMessenger } from 'api/messenger/context';
import { IConversation } from 'api/messenger/objects/states.types';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef, useMemo } from 'react';

type ConversationTabType = 'priority' | 'general' | 'icebreaker' | 'search' | '';

interface ConversationContextType {
  // State
  inboxTab: ConversationTabType;
  setInboxTab: (tab: ConversationTabType) => void;
  CONVERSATIONS_PER_PAGE: number;
  filteredConversations: IConversation[];
  selectedConversations: IConversation[];
  setSelectedConversations: React.Dispatch<React.SetStateAction<IConversation[]>>;
  activeConversation: IConversation | null;
  setActiveConversation: React.Dispatch<React.SetStateAction<IConversation | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedMenuItem: string;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  archiveSpamFav: string;
  setArchiveSpamFav: React.Dispatch<React.SetStateAction<string>>;

  handleConversationSelect: (conversation: IConversation) => void;
  loadConversations: () => Promise<void>;
  handleSelectAll: (checked: boolean) => void;
  handleCheckboxChange: (conversation: IConversation, checked: boolean) => void;
  handleToggleFavoriteConversation: (conversation: IConversation) => void;
  handleToggleSpamConversation: (conversationIds: number[]) => void;
  handleArchiveConversations: (conversationIds: number[]) => void;
  handleInboxTabClick: (tab: ConversationTabType) => void;
  handleDeleteConversations: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({ children }) => {
  const authUser = useSelector((state: RootState) => state.auth?.user);
  const {
    conversations,
    setConversations,
    getConversations,
    getConversationMessages,
    getSearchMessages,
    setActiveConversation,
    activeConversation,
    toggleConversationFavorite,
    toggleConversationIsArchived,
    toggleConversationsIsSpam,
    deleteConversations
  } = useMessenger();

  const initialized = useRef(false);
  const CONVERSATIONS_PER_PAGE = 20;
  const [inboxTab, setInboxTab] = useState<ConversationTabType>('priority');
  const [selectedConversations, setSelectedConversations] = useState<IConversation[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("General Inbox");
  const [filteredConversations, setFilteredConversations] = useState<IConversation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConvos, setShowConvos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [archiveSpamFav, setArchiveSpamFav] = useState<string>("");
  let prevtab:ConversationTabType = 'priority';

  useEffect(() => {
    //Idk what this does.
    if (!initialized.current && conversations.length > 0) {
      //setConversations(() => conversations.filter(conv => conv.is_favorite));
      initialized.current = true;
    }
  }, [conversations]);

  useEffect(() => {
    if(inboxTab !== 'search') return;
    const skip = (currentPage - 1) * CONVERSATIONS_PER_PAGE;
    getSearchMessages({
      searchTerm,
      skip: skip,
      take: CONVERSATIONS_PER_PAGE
    });
  }, [searchTerm,currentPage]);

  useEffect(()=> {
    if(inboxTab !== prevtab){
      prevtab = inboxTab;
      setCurrentPage(1);
    }
  },[inboxTab])
  
  const handleConversationSelect = (conversation: IConversation) => {
    setActiveConversation(conversation);
    getConversationMessages({ conversationId: conversation.conversation_id });
  }

  const handleInboxTabClick = (tab: ConversationTabType) => {
    setInboxTab(tab);
  }

  const handleCheckboxChange = (conversation: IConversation, checked: boolean) => {
    if (checked) {
      setSelectedConversations([...selectedConversations, conversation]);
    } else {
      setSelectedConversations(selectedConversations.filter(conv => conv.id !== conversation.id));
    }
  };
  
  const handleDeleteConversations = () => {
    deleteConversations({ conversationIds: selectedConversations.map(conv => conv.id) });
    setSelectedConversations([]);
    if (activeConversation && selectedConversations.some(conv => conv.id === activeConversation.id)) {
      setActiveConversation(null);
    }
    loadConversations();
  }

  const loadConversations = useCallback(async () => {
    const skip = (currentPage - 1) * CONVERSATIONS_PER_PAGE;
    if (authUser && inboxTab !== 'search') {
      await getConversations({
        ascending: false,
        skip: skip,
        take: CONVERSATIONS_PER_PAGE,
        sortByTime: false,
        hasActiveIcebreaker: inboxTab === "icebreaker",
        conversationType: inboxTab,
        getArchived: archiveSpamFav === "archive",
        getSpam: archiveSpamFav === "spam",
        getFavorited: archiveSpamFav === "favorite",
      });
    }
  }, [authUser, inboxTab, getConversations, CONVERSATIONS_PER_PAGE, currentPage, archiveSpamFav]);

  const handleSelectAll = useCallback((checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedConversations(conversations);
    } else {
      setSelectedConversations([]);
    }
  }, [conversations]);

  const handleToggleFavoriteConversation = useCallback((conversation: IConversation) => {
    toggleConversationFavorite({ conversationId: conversation.conversation_id });
  }, [toggleConversationFavorite]);

  const handleToggleSpamConversation = useCallback((conversationIds: number[]) => {
    toggleConversationsIsSpam({ conversationIds: conversationIds });
    loadConversations();
  }, [toggleConversationsIsSpam]);

  const handleArchiveConversations = useCallback((conversationIds: number[]) => {
    toggleConversationIsArchived({ conversationIds: conversationIds });
    loadConversations();
  }, [toggleConversationIsArchived]);

  
  const value: ConversationContextType = useMemo(() => {
    return {
      CONVERSATIONS_PER_PAGE,
      inboxTab,
      setInboxTab,
      filteredConversations,
      selectedConversations,
      setSelectedConversations,
      activeConversation,
      setActiveConversation,
      currentPage,
      setCurrentPage,
      handleConversationSelect,
      loadConversations,
      handleSelectAll,
      handleCheckboxChange,
      handleToggleFavoriteConversation,
      handleToggleSpamConversation,
      handleArchiveConversations,
      handleInboxTabClick,
      selectedMenuItem,
      setSelectedMenuItem,
      searchTerm,
      setSearchTerm,
      handleDeleteConversations,
      archiveSpamFav,
      setArchiveSpamFav,
    };
  }, [
    inboxTab,
    filteredConversations,
    selectedConversations,
    activeConversation,
    currentPage,
    selectedMenuItem,
    searchTerm,
    // Add any other dependencies that affect the value
  ]);

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};