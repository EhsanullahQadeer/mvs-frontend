/*************************************************************************
 * @file auth.reducer.ts
 * @author Zohaib Ahmed
 * @desc Manages user authentication and transaction state.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import ActionType from "../types";

const initialState = {
    conversations_list: [],
    active_conversation_messages: [],
    active_conversation_id: null,
    type: null,
};

const InboxReducer = (state = initialState, action: any): any => {
    console.log("=== Reducer Inbox ===");
    console.log(action);
    switch (action.type) {
        case ActionType.CONVERSATONS_LIST:
            return {
                ...state,
                type: action.type,
                conversations_list: action.payload.data
            };

        case ActionType.CONVERSATONS_LIST_FAILED:
            return {
                ...state,
                type: action.type
            };
        default:
            return {
                ...state,
                type: null
            };
    }
};

export default InboxReducer;
