/*************************************************************************
 * @file ConfigManager.ts
 * @author End Quote
 * @desc Configuration manager for accessing environment variables.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

export class ConfigManager {
  private readonly config: Record<string, any>;

  constructor() {
    this.config = {
      // General
      API: process.env.REACT_APP_API_URL,

      // Stripe
      STRIPE: {
        PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
      },
      
      // API Gateway
      GATEWAY: {
        API_URL: process.env.REACT_APP_APIGATEWAY_URL,
      }
    };
  }

  get(key: string): any {
    const parts = key.split('.');
    let value = this.config;
    for (const part of parts) {
      value = value[part];
      if (value === undefined) {
        return undefined;
      }
    }
    return value;
  }
}

export const config = new ConfigManager();