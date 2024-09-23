/*************************************************************************
 * @file index.tsx
 * @author End Quote
 * @desc Entry point for rendering profile pages.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { useState } from 'react';
import Avatar from 'react-avatar';
import Modal from 'react-modal';

/* LOCAL IMPORTS */
import ScrollableContainer from 'components/util/scrollable-container';
import Theme from 'theme';
import { useProfilePageHooks } from './ProfilePage.hooks';
import Chatbox from 'components/Chatbox';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { config } from 'config/ConfigManager';
import defaultAvatar from '../../assets/img/defaultProfilePicture.png';

const ProfilePage = (

) => {

  /* States and Hooks */
  const {
    state,
    user, 
    setUser,
    username,
    loading,
    setLoading,
    error,
    setError,
    useFetchMessages,
  } = useProfilePageHooks();
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [chatboxIsOpen, setDisplayChatbox] = useState(false);
  const closeChatbox = () => setDisplayChatbox(false);
  const displayChatbox = () => setDisplayChatbox(true);

  const {
    messages,
    setMessages,
    convId
  } = useFetchMessages( state?.auth?.user?.UserId, user?.UserId );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Theme>
      <div className="flex">
        <div className="flex-1">

          {/* BANNER */}
          <div
            style={{
              width: '100%',
              height: '256px',
              backgroundImage: `url(${user?.Banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              padding: '16px',
              alignItems: 'center',
              flexDirection: 'row',
              display: 'flex',
            }}
          >
            {/* User Information */}
            <div
              className="row-container"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >

              {/* Thumbnail */}
              {user?.Thumbnail ? (
                <Avatar src={user?.Thumbnail} size="200" round={true} />
              ) : (
                <Avatar src={defaultAvatar} size="200" round={true} />
              )}

              {/* User Information */}
              <div
                className="column-container"
                style={{
                  padding: '16px',
                  width: '450px',
                }}
              >
                {/* Name and Bio */}
                <div>
                  <h1
                    style={{
                      color: 'white',
                      marginLeft: '10px',
                      fontSize: '40px',
                      fontWeight: 'bold',
                    }}
                  >
                    {user?.profile.FirstName} {user?.profile.LastName}
                  </h1>
                  <p
                    style={{
                      color: 'white',
                      marginLeft: '10px',
                    }}
                  >
                    @{user?.Username}
                  </p>
                  <p
                    style={{
                      color: 'white',
                      marginLeft: '10px',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      fontWeight: '400',
                      textAlign: 'left',
                      marginBottom: '10px',
                    }}
                  >
                    {user?.Description}
                  </p>
                </div>

                {/* Message User Button */}
                <div>
                  <button
                    className="relative rounded-full"
                    style={{
                      border: '1px solid white',
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      backgroundColor: 'transparent',
                      borderRadius: '6px',
                    }}
                    onClick={displayChatbox}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        marginRight: '6px',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    Submit Message
                  </button>
                </div>

              </div>
            </div>
          </div>
          {/* END BANNER */}
          
          {/* CREDITS */}
          <div
            style={{
              padding: '16px',
              borderBottom: '2px solid #1F1F1F',
              paddingBottom: '16px',
            }}
          >
            <ScrollableContainer scrollAutomatically={true} title="Credits">
              <div className="carousel-inner flex transition-transform duration-1000 ease-linear">
                {user?.credits?.map((credit, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: '4px',
                      width: '200px',
                      height: '100px',
                      margin: '4px',
                      flexShrink: 0,
                      backgroundColor: '#232426',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      padding: '16px',
                      border: '1px solid #494949',
                    }}
                  >
                    {credit}
                  </div>
                ))}
              </div>
            </ScrollableContainer>
          </div>
          {/* END CREDITS */}

          {/* LIBRARY */}
          <div
            style={{
              padding: '16px',
              borderBottom: '2px solid #1F1F1F',
              paddingBottom: '16px',
            }}
          >
          </div>
          {/* END LIBRARY */}

        </div>

        <div className="ml-auto flex-1 w-1/2">

        {/* Load Chatbox on Profile Page */}
          {chatboxIsOpen &&
            <Elements stripe={loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'))}>
              <Chatbox
                selectedConversation={convId}
                messages={messages}
                setMessages={setMessages}
                recipientId={user?.UserId}
                conversationId={convId}
                // Recipient information
                RecipientProfile={undefined}
              />
            </Elements>
          }
        </div>
      </div>

      {user ? <div></div> : <p></p>}
    </Theme>
  );
};

export default ProfilePage;
