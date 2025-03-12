/*************************************************************************
 * @file APIGatewayManager.ts
 * @author End Quote
 * @desc Manages WebSocket connections using the AWS API Gateway.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

class APIGatewayManager {
  private websocketUrl: string;
  private socket: WebSocket | null = null;
  private reconnectInterval: number = 5000; // 5 seconds
  private userId: string;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private dynamicHandlers: { [key: string]: { [handlerId: string]: (data: any) => void } } = {};

  constructor(
    websocketUrl: string, 
    userId: string,
    private onStatusChange: (status: 'connected' | 'disconnected' | 'error') => void
  ) {
    console.log('Initializing APIGatewayManager');
    console.log('websocketUrl:', websocketUrl);
    console.log('userId:', userId);
    this.websocketUrl = `${websocketUrl}?userId=${userId}`;
    console.log('websocketUrl', this.websocketUrl);
    this.userId = userId;
    this.initialize();
  }

  private initialize() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.socket = new WebSocket(this.websocketUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        console.log('event.data', event.data);
        const data = JSON.parse(event.data);
        const handlers = this.dynamicHandlers[data.type];
        if (handlers && Object.keys(handlers).length > 0) {
          Object.values(handlers).forEach(handler => {
            try {
              handler(data);
            } catch (e) {
              console.error('Handler error:', e);
            }
          });
        }
      } catch (e) {
        console.error('Message parsing error:', e);
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      this.reconnectAttempts++;
      console.log(`WebSocket closed. Attempt ${this.reconnectAttempts} of ${this.maxReconnectAttempts}`);
      
      setTimeout(() => {
        if (!this.isConnected) {
          this.initialize();
        }
      }, this.reconnectInterval);
    };

    this.socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      this.socket?.close();
    };

    window.addEventListener('beforeunload', this.cleanup.bind(this));
    window.addEventListener('unload', this.cleanup.bind(this));
  }

  public cleanup() {
    if (this.socket) {
      this.socket.close();
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
    }
    window.removeEventListener('beforeunload', this.cleanup.bind(this));
    window.removeEventListener('unload', this.cleanup.bind(this));
  }

  public registerHandler(type: string, handler: (data: any) => void, handlerId: string) {
    if (!this.dynamicHandlers[type]) {
      this.dynamicHandlers[type] = {};
    }
    this.dynamicHandlers[type][handlerId] = handler;
  }

  public unregisterHandler(type: string, handlerId: string) {
    if (this.dynamicHandlers[type] && this.dynamicHandlers[type][handlerId]) {
      delete this.dynamicHandlers[type][handlerId];
      if (Object.keys(this.dynamicHandlers[type]).length === 0) {
        delete this.dynamicHandlers[type];
      }
    }
  }

  // Add heartbeat to check connection
  private startHeartbeat() {
    setInterval(() => {
      if (this.isConnected && this.socket?.readyState === WebSocket.OPEN) {
        try {
          this.socket.send(JSON.stringify({ type: 'PING' }));
        } catch (e) {
          console.error('Heartbeat failed:', e);
          this.socket?.close();
        }
      }
    }, 30000); // Every 30 seconds
  }

  // Add method to force reconnection
  public reconnect() {
    this.socket?.close();
    this.reconnectAttempts = 0;
    this.initialize();
  }

  // Add public getter
  public get connected(): boolean {
    return this.isConnected;
  }
}

export default APIGatewayManager;