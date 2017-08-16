// initialState = {
//   /* Books ---------------------------------------------- */
//      Each book object includes book.sentenceArray and
//      book.wordMap, so we don’t have to retrieve those
//      separately.
//   books: [],         // array of ALL book objects
//   bookSet1: [],      // array of book IDs; can be saved
//                      // to the db as a BookSet, eventually
//   bookSet2: [],      // another array of book IDs, for
//                      // comparison
//   selectedWord: '',  // the word itself; we're not using a
//                      // discrete Word model, so they don't
//                      // have persistent IDs
//   singleBook: {}     // a single book object
// },
//   /* Users ---------------------------------------------- */
//   currentUser: {     // if a user is logged in at all
//     userId: null,
//     isAdmin: false
//    }
// }

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import book from './bookReducer';
import user from './userReducer';

const reducer = combineReducers({ book, user });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './bookReducer';
export * from './userReducer';
