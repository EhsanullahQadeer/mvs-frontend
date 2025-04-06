/*************************************************************************
 * @file tokenrefresher.actions.ts
 * @author Ramiro Santos
 * @desc Manages token refreshing.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { refreshToken } from "redux/actions/auth.actions";
import cookie from "js-cookie";
import { store } from "redux/store";

let refreshInterval: NodeJS.Timeout | null = null;
const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
const refreshThreshold = 10 * 60 * 1000; // 10 minutes in milliseconds

export function refreshTokenEvery(interval: number) {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  refreshInterval = setInterval(() => {
    const token = cookie.get("token");
    if (token) {
      console.log('Refreshing token on schedule');
      store.dispatch(refreshToken() as any); 
    }
  }, interval);
  
  return () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  };
}

export function initializeTokenRefresher() {
  events.forEach(event => {
    window.addEventListener(event, handleUserActivity);
  });
  
  handleUserActivity();
  
  return () => {
    events.forEach(event => {
      window.removeEventListener(event, handleUserActivity);
    });
  };
}

function handleUserActivity() {
  const token = cookie.get("token");
  if (!token) return;
  
  const tokenExpiresAt = cookie.get("tokenExpiresAt");
  if (tokenExpiresAt) {
    const expirationTime = new Date(tokenExpiresAt).getTime();
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    if (timeUntilExpiration > 0 && timeUntilExpiration < refreshThreshold) {
      console.log('Token needs refreshing...');
      store.dispatch(refreshToken() as any);
    }
  }
}
