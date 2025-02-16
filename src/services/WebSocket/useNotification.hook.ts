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
    registerHandler(eventType, handler);
    return () => {
      unregisterHandler(eventType);
    };
  }, [eventType, handler, registerHandler, unregisterHandler]);
};