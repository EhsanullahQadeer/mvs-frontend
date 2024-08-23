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
import InboxTypes from './inbox.types';

const ActionType = {
  ...AuthActionTypes,
  ...SoundActionTypes,
  ...InboxTypes,
};

export default ActionType;
