import { combineReducers } from 'redux';
import book_reducer from './book_reducer';
import user_reducer from './user_reducer';

const rootReducer = combineReducers({
  book_reducer, user_reducer
});

export default rootReducer;

