/*************************************************************************
 * @file index.ts
 * @author Zohaib Ahmed
 * @desc Combines all individual reducers into a single root reducer.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { combineReducers } from 'redux';

/* LOCAL IMPORTS */
import authReducer from './auth.reducer';
import soundsReducer from './sounds.reducer';

const reducers = combineReducers({
    auth: authReducer,
    sounds: soundsReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;