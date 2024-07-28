/*************************************************************************
 * @file ProfilePage.hooks.tsx
 * @author End Quote
 * @desc Custom hooks for user profile page state management.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/


/* IMPORTS */
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/* LOCAL IMPORTS */
import { config } from 'config/ConfigManager';
import { fetchConversationId, getMessages } from 'api/messenger';
import { RootState } from 'redux/reducers';

export const useProfilePageHooks = () => {
  const state = useSelector((state: RootState) => state);

  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ProfileInformation, setProfileInformation] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${config.get('API')}/users/username/${username}`);
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data = await response.json();
        setUser( data );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

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

  useEffect(() => {
    console.log('state here', state);
  }, [ state ]);




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