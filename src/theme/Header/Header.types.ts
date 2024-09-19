/*************************************************************************
 * @file Header.tsx
 * @author End Quote
 * @desc Provides layout and navigation for the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  thumbnail?: string;
  [key: string]: any; // Additional properties can be added if needed
}

export interface RootState {
  [x: string]: any;
  auth: {
    user: UserData | null;
    loading: boolean;
    error: string | null;
  };
}

export interface HeaderProps {}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}
