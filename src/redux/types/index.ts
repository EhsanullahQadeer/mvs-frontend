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
import BreadcrumbActionTypes from './breadcrumb.types';

const ActionType = {
  ...AuthActionTypes,
  ...SoundActionTypes,
  ...BreadcrumbActionTypes,
};

export default ActionType;
