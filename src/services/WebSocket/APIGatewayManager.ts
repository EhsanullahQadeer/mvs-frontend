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
  private dynamicHandlers: { [key: string]: { [handlerId: string]: (data: any) => void } } = {};

  constructor(
    websocketUrl: string, 
    userId: string
  ) {
    this.websocketUrl = `${websocketUrl}?userId=${userId}`;
    this.userId = userId;
    this.initialize();
  }

  private initialize() {
    this.socket = new WebSocket(this.websocketUrl);

    this.socket.onopen = () => {};

    this.socket.onmessage = (event: MessageEvent) => {
      console.log('onmessage', event);
      const data = JSON.parse(event.data);
      const handlers = this.dynamicHandlers[data.type];
      if (handlers && Object.keys(handlers).length > 0) {
        Object.values(handlers).forEach(handler => handler(data));
      } else {
        console.warn(`No handlers found for message type: ${data.type}`);
        console.log('Available event types:', Object.keys(this.dynamicHandlers));
      }
    };

    this.socket.onclose = () => {
      setTimeout(() => {
        this.initialize();
      }, this.reconnectInterval);
    };

    this.socket.onerror = (error: Event) => {
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
}

export default APIGatewayManager;