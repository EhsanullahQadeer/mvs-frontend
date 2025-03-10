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
import { getConversationMessages, getConversations } from "api/messenger";

export const useInboxHooks = () => {

  /* States */
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationsList, setConversationsList] = useState([]);
  const state = useSelector((state: RootState) => state);
  const [messages, setMessages] = useState([]);
  const [sortOption, setSortOption] = useState('Newest');
  const handleSortChange = (option) => setSortOption(option);

  useEffect(() => {
    // if (state.auth.user && state.auth.user.UserId) {
    //   const fetchConversations = async () => {
    //     try {
    //       const conversations = await getConversations({
    //         skip: 0,
    //         take: 20,
    //         sortByTime: false,
    //         hasActiveIcebreaker: false,
    //         conversationType: "general",
    //         ascending: true,
    //       });
    //       setConversationsList(conversations.data?.conversations);
    //     } catch (error) {
    //       console.error('Error fetching conversations:', error);
    //     }
    //   };

    //   fetchConversations();
    // }
  }, [ state.auth.user ]);


  const handleConversationClick = async (
    conversation
  ) => {
    setSelectedConversation(conversation);
    const conversationMessages = await getConversationMessages({
      conversationId: conversation.id,
      skip: 0,
      take: 20,
    });
    setMessages(conversationMessages.data?.messages);
  };


  useEffect(() => {
    console.log('conversation list', conversationsList);
  }, [conversationsList])

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