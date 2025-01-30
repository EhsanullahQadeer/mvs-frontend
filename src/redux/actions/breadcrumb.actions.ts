/*************************************************************************
 * @file auth.actions.ts
 * @author Karla Zamora
 * @desc Manages breadcrumb actions.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import ActionType from "../types";

export const setBreadcrumbs = (breadcrumbs: { name: string; path: string }[]) => ({
  type: ActionType.SET_BREADCRUMBS,
  payload: breadcrumbs,
});

export const clearBreadcrumbs = () => ({
  type: ActionType.CLEAR_BREADCRUMBS,
});

export const addBreadcrumb = (breadcrumb: { name: string; path: string }) => ({
  type: ActionType.ADD_BREADCRUMB,
  payload: breadcrumb,
});

export const popBreadcrumb = () => ({
  type: ActionType.POP_BREADCRUMB,
});
