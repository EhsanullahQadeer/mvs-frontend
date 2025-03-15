/*************************************************************************
 * @file APIGatewayManager.ts
 * @author End Quote
 * @desc Provides a context and hooks for managing WebSocket connections 
 *       and handling WebSocket events with the API Gateway.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react';
import { useSelector } from 'react-redux';

/* LOCAL IMPORTS */
import APIGatewayManager from './APIGatewayManager';
import { RootState } from 'redux/reducers';
import { config } from 'config/ConfigManager';

interface WebSocketContextType {
  webSocketManager: APIGatewayManager | null;
  registerHandler: (type: string, handler: (data: any) => void, handlerId: string) => void;
  unregisterHandler: (type: string, handlerId: string) => void;
}

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [webSocketManager, setWebSocketManager] = useState<APIGatewayManager | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');
  const websocketUrl = config.get('GATEWAY.API_URL');

  useEffect(() => {
    if (userId) {
      try {
        const manager = new APIGatewayManager(
          websocketUrl, 
          userId,
          (status) => setConnectionStatus(status)
        );
        setWebSocketManager(manager);

        // Periodic connection check
        const checkInterval = setInterval(() => {
          if (!manager.connected) {
            console.log('Connection lost, attempting to reconnect...');
            manager.reconnect();
          }
        }, 60000); // Check every minute

        return () => {
          clearInterval(checkInterval);
          manager.disconnect();
          setWebSocketManager(null);
        };
      } catch (e) {
        console.error('WebSocket initialization error:', e);
        setConnectionStatus('error');
      }
    }
  }, [userId, websocketUrl]);

  const registerHandler = (type: string, handler: (data: any) => void, handlerId: string) => {
    webSocketManager?.registerHandler(type, handler, handlerId);
  };

  const unregisterHandler = (type: string, handlerId: string) => {
    webSocketManager?.unregisterHandler(type, handlerId);
  };

  return (
    <WebSocketContext.Provider value={{ webSocketManager, registerHandler, unregisterHandler }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
