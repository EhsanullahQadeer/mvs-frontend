/*************************************************************************
 * @file sounds.reducer.ts
 * @author Zohaib Ahmed
 * @desc Reducer for managing sound-related state.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import ActionType from "../types";

const initialState = {
  sounds: [],
  type: null,
  total: 0,
};

const soundsReducer = (state = initialState, action: any): any => {
  console.log("=== Reducer Sounds ===");
  console.log(action);
  switch (action.type) {
    case ActionType.GET_SOUNDS:
      return {
        ...state,
        type:action.type,
        sounds: action.payload.data.results.data,
        total: action.payload.data.results.total
      };
    case ActionType.GET_SOUNDS_FAIL:
      return {
        ...state,
        type:action.type
      };
    default:
      return {
        ...state,
        type:null
      };
  }
};

export default soundsReducer;
