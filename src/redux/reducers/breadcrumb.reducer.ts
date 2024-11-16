/*************************************************************************
 * @file breadcrumb.reducer.ts
 * @author Karla Zamora
 * @desc Manages breadcrumb state for navigation paths.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import ActionType from "../types";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbState {
  breadcrumbs: BreadcrumbItem[];
}

const initialState: BreadcrumbState = {
  breadcrumbs: [],
};

const breadcrumbReducer = (state = initialState, action: any): BreadcrumbState => {
  console.log("=== Reducer Breadcrumb ===");
  console.log(action);

  switch (action.type) {
    case ActionType.SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload,
      };
    case ActionType.ADD_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.payload],
      };
    case ActionType.POP_BREADCRUMB:
      return {
        ...state,
        breadcrumbs: state.breadcrumbs.slice(0, -1),
      };
    case ActionType.CLEAR_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: [],
      };
    default:
      return state;
  }
};

export default breadcrumbReducer;
