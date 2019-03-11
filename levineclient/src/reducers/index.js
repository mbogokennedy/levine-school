import {combineReducers} from 'redux';

import studentReducer from './studentReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    student: studentReducer,
    errors: errorReducer,
    auth: authReducer
})