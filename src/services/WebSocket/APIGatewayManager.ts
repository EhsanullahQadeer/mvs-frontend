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
  private dynamicHandlers: { [key: string]: (data: any) => void } = {};

  constructor(
    websocketUrl: string, 
    userId: string
  ) {
    this.websocketUrl = `${websocketUrl}?userId=${userId}`;
    this.userId = userId;
    this.initialize();
  }

  private initialize() {
    this.socket = new WebSocket( this.websocketUrl );

    // @TODO: make this more robust by actually having some logic here
    this.socket.onopen = () => {};

    this.socket.onmessage = (event: MessageEvent) => {
      console.log('Raw WebSocket message:', event.data);
      const data = JSON.parse(event.data);
      console.log('Parsed message:', data);
      
      const handler = this.dynamicHandlers[data.type];
      if (handler) {
        handler(data);
      } else {
        console.warn(`No handler found for message type: ${data.type}`);
        console.log('Available handlers:', Object.keys(this.dynamicHandlers));
      }
    };

    this.socket.onclose = () => {
      setTimeout(() => {
        this.initialize();
      }, this.reconnectInterval);
    };

    this.socket.onerror = (
      error: Event
    ) => {
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

  public registerHandler(type: string, handler: (data: any) => void) {
    this.dynamicHandlers[type] = handler;
  }

  public unregisterHandler(type: string) {
    delete this.dynamicHandlers[type];
  }
}

export default APIGatewayManager;