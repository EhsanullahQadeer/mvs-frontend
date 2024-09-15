/*************************************************************************
 * @file Inbox.hooks.ts
 * @author End Quote
 * @desc Custom hooks for handling Inbox-related logic and state 
 *       management.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/* LOCAL IMPORTS */
import { RootState } from "../../../redux/reducers";
import { getMessages, getUserConvo } from "api/messenger";

export const useInboxHooks = () => {

  /* States */
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationsList, setConversationsList] = useState([]);
  const state = useSelector((state: RootState) => state);
  const [messages, setMessages] = useState([]);
  const [sortOption, setSortOption] = useState('Newest');
  const handleSortChange = (option) => setSortOption(option);

  useEffect(() => {
    if (state.auth.user && state.auth.user.UserId) {
      const fetchConversations = async () => {
        try {
          const conversations = await getUserConvo( state.auth.user.UserId );
          setConversationsList(conversations);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      };

      fetchConversations();
    }
  }, [ state.auth.user ]);


  const handleConversationClick = async (
    conversation
  ) => {
    setSelectedConversation(conversation);
    const conversationMessages = await getMessages(conversation.conversationId);
    setMessages(conversationMessages);
  };


  useEffect(() => {
    console.log('conversation list', conversationsList);
  }, [conversationsList])
  

  const getRecipientProfileInfo = (
    conversationsList
  ) => {
    
  }

  return({
    state,
    selectedConversation, setSelectedConversation,
    conversationsList, setConversationsList,
    messages, setMessages,
    sortOption, setSortOption,
    handleSortChange,
    handleConversationClick,
  })
}