import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useMessenger } from 'api/messenger/context';
import { useNotification } from 'services/WebSocket/useNotification.hook';
import { IConversation, IMessage } from 'api/messenger/objects/states.types';
import messageSound from "../../../../assets/audio/message-notification.mp3";
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';

type ConversationTabType = 'priority' | 'general' | 'icebreaker' | 'search' | 'connections' | '';

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
    getConversations,
    getConversationMessages,
    getSearchMessages,
    setActiveConversation,
    activeConversation,
    toggleConversationFavorite,
    toggleConversationIsArchived,
    toggleConversationsIsSpam,
    deleteConversations,
    setConversations,
    setTotalPriorityInboxUnread,
    setTotalGeneralInboxUnread,
    setTotalIcebreakerInboxUnread,
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
    setMessages,
    messages
  } = useMessenger();

  const CONVERSATIONS_PER_PAGE = 20;
  const [inboxTab, setInboxTab] = useState<ConversationTabType>('priority');
  const [selectedConversations, setSelectedConversations] = useState<IConversation[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("General Inbox");
  const [filteredConversations, setFilteredConversations] = useState<IConversation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [archiveSpamFav, setArchiveSpamFav] = useState<string>("");
  let prevtab:ConversationTabType = 'priority';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        audioRef.current = new Audio(messageSound);
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.preload = "auto";

        // Wait for audio to load
        await new Promise(resolve => {
          if (audioRef.current) {
            audioRef.current.addEventListener('canplaythrough', resolve, { once: true });
            audioRef.current.load();
          }
        });

        console.log('Message sound loaded successfully');
      } catch (error) {
        console.error('Error initializing message sound:', error);
      }
    };

    initAudio();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback(() => {
    console.log('Attempting to play message sound');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Message sound played successfully');
          })
          .catch(err => {
            console.warn('Could not play message sound:', err);
          });
      }
    } else {
      console.log("Audio not loaded, skipping playback");
    }
  }, []);



  useNotification("NEW_MESSAGE", (data) => {
    const message = data.message as IMessage;
      const shouldUpdateConversation = 
        (message.conversation.is_priority && inboxTab === "priority") ||
        (!message.conversation.is_priority && inboxTab === "general") ||
        (message.conversation.active_icebreaker && inboxTab === "icebreaker");



      if (shouldUpdateConversation) {
        if (conversations.some(conv => conv.conversation_id === String(message.conversation.conversation_id))) {
          const conversationArray = [...conversations];
          const filteredConversations = conversationArray.filter(conv =>
            conv.conversation_id !== String(message.conversation.conversation_id)
          );

          setConversations([
            {
              ...message.conversation,
              conversation_id: String(message.conversation.conversation_id),
              unread_count: message.conversation.unread_count,
              available_funds: message.conversation.available_funds,
              total_paid: message.conversation.total_paid,
              lastMessageSummary: message.content,
              user: message.conversation.user,
              recipient: {
                ...message.sender,
                name: message.sender.professional_name,
                thumbnail: message.sender.thumbnail
              },
              messages: [message]
            },
            ...filteredConversations
          ]); 
        } else {
          const conversationArray = [...conversations];
          if (conversationArray.length >= CONVERSATIONS_PER_PAGE) {
            setConversations([
              {
                ...message.conversation,
                unread_count: message.conversation.unread_count,
                available_funds: message.conversation.available_funds,
                total_paid: message.conversation.total_paid,
                lastMessageSummary: message.content,
                user: message.conversation.user,
                recipient: {
                  ...message.sender,
                  name: message.sender.professional_name,
                  thumbnail: message.sender.thumbnail
                },
                messages: [message]
              },
              ...conversationArray.slice(0, -1)
            ]);
          } else {
            setConversations([
              {
                ...message.conversation,
                unread_count: 1,
                available_funds: 0,
                total_paid: 0,
                lastMessageSummary: message.content,
                user: message.conversation.user,
                recipient: {
                  ...message.sender,
                  name: message.sender.professional_name,
                  thumbnail: message.sender.thumbnail
                },
                messages: [message]
              },
              ...conversationArray
            ]);
          }
        }
      }

      console.log('got here at leats');
      if (message.conversation.is_priority) {
        console.log("totalPriorityInboxUnread", totalPriorityInboxUnread);
        setTotalPriorityInboxUnread(totalPriorityInboxUnread + 1);
      } else if (message.conversation.active_icebreaker) {
        console.log("totalIcebreakerInboxUnread", totalIcebreakerInboxUnread);
        setTotalIcebreakerInboxUnread(totalIcebreakerInboxUnread + 1);
      } else {
        console.log("totalGeneralInboxUnread", totalGeneralInboxUnread);
        setTotalGeneralInboxUnread(totalGeneralInboxUnread + 1);
      }

    playSound();
  });


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
    setMessages(null);
    getConversationMessages({ conversationId: conversation.conversation_id, limit: 10, cursor: 0 });
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
        getConnected: inboxTab === "connections"
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
    CONVERSATIONS_PER_PAGE
  ]);

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};