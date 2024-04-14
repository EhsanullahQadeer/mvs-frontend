import { combineReducers } from 'redux';
import authReducer from './auth';
import soundsReducer from './sounds';

const reducers = combineReducers({
    auth: authReducer,
    sounds: soundsReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;