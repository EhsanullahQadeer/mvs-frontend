/*************************************************************************
 * @file useLambdaEvent.hook.ts
 * @author End Quote
 * @desc Custom hook for registering and unregistering WebSocket event 
 *       handlers within the APIGatewayManager context.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useEffect } from 'react';
import { useWebSocket } from './APIGatewayManager.context';

export const useNotification = (
  eventType: string, 
  handler: (data: any) => void
) => {
  const { registerHandler, unregisterHandler } = useWebSocket();

  useEffect(() => {
    // Generate a unique ID for this handler
    const handlerId = Math.random().toString(36).substr(2, 9);
    
    // Register with unique ID
    registerHandler(eventType, handler, handlerId);
    
    return () => {
      // Unregister with the same ID
      unregisterHandler(eventType, handlerId);
    };
  }, [eventType, handler, registerHandler, unregisterHandler]);
};