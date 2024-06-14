// src/components/ProfilePage.tsx
import config from 'config/config';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Theme from 'theme';
import ScrollableContainer from 'util/ScrollableContainer';
import { fetchCurrentUser } from "redux/actionCreators/auth";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${config.defaults.api_url}/user/${username}`);
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data = await response.json();
        setUser(data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Theme>
      {/* BANNER */}
      <div
        style={{
          width: '100%',
          height: '256px',
          backgroundImage: `url(${user?.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '16px',
          alignItems: 'center',
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <div
          className="row-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {user?.thumbnail ? (
            <Avatar src={user?.profilePicture} size="200" round={true} />
          ) : (
            <Avatar name={user?.name} size="200" round={true} />
          )}
          <div
            className="column-container"
            style={{
              padding: '16px',
              width: '450px',
            }}
          >
            <div>
              <h1
                style={{
                  color: 'white',
                  marginLeft: '10px',
                  fontSize: '40px',
                  fontWeight: 'bold',
                }}
              >
                {user?.name}
              </h1>
              <p
                style={{
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                @{user?.username}
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
                {user?.bio}
              </p>
            </div>
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

      {/* LIBRARY */}
      <div
        style={{
          padding: '16px',
          borderBottom: '2px solid #1F1F1F',
          paddingBottom: '16px',
        }}
      >
        {/* If length is 0, this breaks*/}
        {/* <PlayerContainer source="downloads"/> */}
      </div>

      {user ? <div></div> : <p></p>}
    </Theme>
  );
};

export default ProfilePage;
