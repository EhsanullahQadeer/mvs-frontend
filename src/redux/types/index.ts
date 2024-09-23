/*************************************************************************
 * @file index.ts
 * @author Zohaib Ahmed
 * @desc Combines action types for authentication and sounds.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import AuthActionTypes from './auth.types';
import SoundActionTypes from './sounds.types';

const ActionType = {
  ...AuthActionTypes,
  ...SoundActionTypes,
};

export default ActionType;
