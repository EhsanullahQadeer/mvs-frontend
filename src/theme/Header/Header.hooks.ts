/*************************************************************************
 * @file Header.hooks.ts
 * @author End Quote
 * @desc Custom hooks for handling header-related logic and state 
 *       management.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cookie from 'js-cookie';

/* LOCAL IMPORTS */
import { updateUserAPI } from '../../api/user';
import { fetchCurrentUser } from '../../redux/actions';
import { UserData, RootState } from './Header.types';
import { isRouteAccessible } from 'utils/authHandler';

export const useHeaderHooks = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [user, setUser] = useState<UserData | null>(null);
  const [contact_us, setContactUs] = useState(false);
  const [user_settings, setUserSettings] = useState(false);
  const dispatch = useDispatch();
  const token = cookie.get('token');

  const LogOut = () => {
    cookie.remove('token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onboardGuide = async () => {
    const payload = {
      ...user,
      first_visit: true
    };

    try {
      const update_user = await updateUserAPI(payload, user?.id);
      if (update_user.data.error) {
        console.error('Error updating user:', update_user.data.error);
      } else {
        await dispatch(fetchCurrentUser() as any);
        console.log('User updated successfully:', update_user.data);
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    if (isRouteAccessible()) {
      dispatch(fetchCurrentUser() as any);

    } else {
      navigate('/login');

    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    setUser(state.auth.user);
    //console.log('users', state);
  }, [state]);

  return {
    state,
    user,
    setUser,
    contact_us,
    setContactUs,
    user_settings,
    setUserSettings,
    onboardGuide,
    LogOut,
  };
};
