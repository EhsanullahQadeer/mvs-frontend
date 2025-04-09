import { ActionType } from "../actionTypes/index";

const initialState = {
  user: null,
  payment: null,
  transactions: [],
};

const authReducer = (state = initialState, action: any): any => {
  console.log("=== Reducer Authentication ===");
  console.log(action);
  switch (action.type) {
    case ActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        type:action.type
      };
    case ActionType.USER_LOGIN_FAIL:
      return {
        ...state,
        type:action.type
      };
    case ActionType.CURRENT_USER:
      return {
        ...state,
        user: action.payload.data,
        type:action.type
      };
    case ActionType.USER_PAYMENT_INFO:
      return {
        ...state,
        payment: action.payload.data.results,
        type:action.type
      };
    case ActionType.USER_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.data.results,
        type:action.type
      };
    default:
      return {
        ...state,
        type:null
      };
  }
};

export default authReducer;
