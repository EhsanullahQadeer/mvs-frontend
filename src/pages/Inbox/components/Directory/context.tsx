import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useMessenger } from 'api/messenger/context';
import { IConversation } from 'api/messenger/objects/states.types';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';

type ConversationTabType = 'priority' | 'general' | 'icebreaker' | 'search';

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
  showArchivedConvos: boolean;
  setShowArchivedConvos: React.Dispatch<React.SetStateAction<boolean>>;
  showFavoriteConvos: boolean;
  setShowFavoriteConvos: React.Dispatch<React.SetStateAction<boolean>>;
  favoriteConversations: IConversation[];
  setGetArchived: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMenuItem: string;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  loadFavoritedConversations: () => Promise<void>;
  handleConversationSelect: (conversation: IConversation) => void;
  loadConversations: () => Promise<void>;
  handleSelectAll: (checked: boolean) => void;
  handleCheckboxChange: (conversation: IConversation, checked: boolean) => void;
  handleToggleFavoriteConversation: (conversation: IConversation) => void;
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
    getConversations,
    getConversationMessages,
    getSearchMessages,
    setActiveConversation,
    activeConversation,
    toggleConversationFavorite,
    toggleConversationIsArchived,
    getFavoritedConversations,
    deleteConversations
  } = useMessenger();

  const initialized = useRef(false);
  const CONVERSATIONS_PER_PAGE = 20;
  const [inboxTab, setInboxTab] = useState<ConversationTabType>('priority');
  const [selectedConversations, setSelectedConversations] = useState<IConversation[]>([]);
  const [favoriteConversations, setFavoriteConversations] = useState<IConversation[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [getArchived, setGetArchived] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("General Inbox");
  const [filteredConversations, setFilteredConversations] = useState<IConversation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showArchivedConvos, setShowArchivedConvos] = useState(false);
  const [showFavoriteConvos, setShowFavoriteConvos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let prevtab:ConversationTabType = 'priority';

  useEffect(() => {
    const favConvos = conversations.filter(conv => conv.is_favorite);
    setFavoriteConversations(favConvos);

    //Idk what this does.
    if (!initialized.current && conversations.length > 0) {
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
    setGetArchived(false);
    setShowArchivedConvos(false);
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
        ascending: true,
        skip: skip,
        take: CONVERSATIONS_PER_PAGE,
        sortByTime: false,
        hasActiveIcebreaker: inboxTab === "icebreaker" ? true : false,
        conversationType: inboxTab,
        getArchived: getArchived
      });
    }
  }, [authUser, inboxTab, getConversations, CONVERSATIONS_PER_PAGE, getArchived, currentPage]);

  const loadFavoritedConversations = useCallback(async () => {
    if (authUser) {
      try {
        const response = await getFavoritedConversations({
          skip: 0,
          take: CONVERSATIONS_PER_PAGE,
        });
        console.log("Favorited conversations response:", response);
      } catch (error) {
        console.error("Error loading favorited conversations:", error);
      }
    }
  }, [authUser, getFavoritedConversations, CONVERSATIONS_PER_PAGE]);

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
    
    setFavoriteConversations(prev => {
      const isCurrentlyFavorite = prev.some(conv => conv.id === conversation.id);
      
      if (isCurrentlyFavorite) {
        return prev.filter(conv => conv.id !== conversation.id);
      } else {
        return [...prev, conversation];
      }
    });
  }, [toggleConversationFavorite]);

  const handleArchiveConversations = useCallback((conversationIds: number[]) => {
    // reloadConversationStats();
    toggleConversationIsArchived({ conversationIds });
    loadConversations();
  }, [toggleConversationIsArchived, loadConversations]);

  
  const value: ConversationContextType = {
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
    showArchivedConvos,
    setShowArchivedConvos,
    showFavoriteConvos,
    setShowFavoriteConvos,
    handleConversationSelect,
    loadConversations,
    handleSelectAll,
    handleCheckboxChange,
    favoriteConversations,
    handleToggleFavoriteConversation,
    handleArchiveConversations,
    handleInboxTabClick,
    setGetArchived,
    selectedMenuItem,
    setSelectedMenuItem,
    searchTerm,
    setSearchTerm,
    loadFavoritedConversations,
    handleDeleteConversations
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};