/*************************************************************************
 * @file ProfilePage.hooks.tsx
 * @author End Quote
 * @desc Custom hooks for user profile page state management.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/* LOCAL IMPORTS */
import { config } from 'config/ConfigManager';
import { fetchConversationId, getMessages } from 'api/messenger';
import { RootState } from 'redux/reducers';
import axios from 'api/axios';

export const useProfilePageHooks = () => {
  const state = useSelector((state: RootState) => state);

  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ProfileInformation, setProfileInformation] = useState(null);

  useEffect(() => {
    if (state?.auth?.user?.UserId && user?.UserId){
      const checkConversationExists = async () =>{ 
        const response = await axios.get('/messenger/check-conversation-exists', {
          params: {
            UserId: state?.auth?.user?.UserId,
            OtherUserId: user?.UserId
          }
        })
      }
      checkConversationExists();
    };
  }, [ user, state ])


  const checkConversationExists = async () => {

  }



  useEffect(() => {
    const fetchUser = async () => {
      try {
        /* Get user's info from Profiles table */
        const profiles_results = await fetch(
          `/users/username/${username}`
        );

        // Convert to legible JSON format
        const data = await profiles_results.json();
        
        /* Get user's info from Users table */
        const users_results = await axios.get(`/users/get-user-info`, {
          params: {
            UserId: data?.UserId
          }
        });
     
        // Combining both results 
        const combinedUserDetails = {
          profile: users_results.data?.available,
          ...data,
        };

        setUser( combinedUserDetails );

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [ username ]);


  const useFetchMessages = (currentUserId, otherUserId) => {
    const [messages, setMessages] = useState([]);
    const [convId, setConvId] = useState(null);
  
    useEffect(() => {
      if (state?.auth?.user?.UserId && otherUserId) {
        const fetchData = async () => {
          try {
            const conversationId = await fetchConversationId(currentUserId, otherUserId);
            if (conversationId) {
              setConvId(conversationId);
              const fetchedMessages = await getMessages(conversationId);
              setMessages(fetchedMessages);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
    }, [currentUserId, otherUserId]);
  
    return { messages, setMessages, convId };
  };

  return{
    state,
    user, 
    setUser,
    username,
    loading, 
    setLoading,
    error,
    setError,
    useFetchMessages,
  }
}