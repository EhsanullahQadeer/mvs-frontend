/*************************************************************************
 * @file index.tsx
 * @author End Quote
 * @desc Handles the Stripe callback when users connect their accounts
 *       with us.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'api/axios';
import { config } from 'config/ConfigManager';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from 'redux/reducers';
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from 'redux/actions';

const StripeCallback: React.FC = (

) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user information when the component mounts
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  // Log Redux state updates
  useEffect(() => {
    console.log('Redux state updated:', user);
  }, [ user ]);

  useEffect(() => {
    const fetchAccessToken = async (
      code: string
    ) => {
      try {
        const response = await fetch(`/stripe/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!user?.UserId) {
          throw new Error('UserId is not available in the state');
        }

        await axios.post('/stripe/store-connect-account', {
          code: data,
          UserId: user.UserId,
        });

        const output = await axios.get('/stripe/get-user-stripe-id', {
          params : {
            UserId: user.UserId
          }
        });

        // Redirect to a success page or update the UI
        navigate('/success'); // @TODO : Redirect to a success page 

      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code && user) {
      fetchAccessToken(code);
    }
  }, [location, navigate, user]);

  if (!user) {
    return <div>Loading user information...</div>;
  }



  return <div>Connecting to Stripe...</div>;
};

export default StripeCallback;