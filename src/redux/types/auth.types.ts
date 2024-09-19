/*************************************************************************
 * @file auth.types.ts
 * @author Zohaib Ahmed
 * @desc Defines action types for authentication.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

export enum AuthActionTypes {
  CURRENT_USER = 'CURRENT_USER',
  CURRENT_USER_FAILED = 'CURRENT_USER_FAILED',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',
  USER_PAYMENT_INFO = 'USER_PAYMENT_INFO',
  USER_TRANSACTIONS = 'USER_TRANSACTIONS',
  USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS',
  USER_CREATION_FAILED = 'USER_CREATION_FAILED',
}

export default AuthActionTypes;
