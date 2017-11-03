// const initialState = {
// /* Books ---------------------------------------------- */
// // Each book object includes book.sentenceArray and
// // book.wordMap, so we don’t have to retrieve those
// // separately.
//   books: [],         // array of ALL book objects
//   bookSet1: [],      // array of book IDs; can be saved
//                      // to the db as a BookSet, eventually
//   bookSet2: [],      // another array of book IDs, for
//                      // comparison
//   selectedWord: '',  // the word itself; we're not using a
//                      // discrete Word model, so they don't
//                      // have persistent IDs
//   singleBook: {},    // a single book object
// /* Users ---------------------------------------------- */
// // If a user is logged in at all…
//   currentUser: {
//     userId: null,
//     isAdmin: false,
//   },
// /* Author --------------------------------------------- */
//   currentAuthor: {
//     firstName: '',
//     lastName: '',
//     pronoun: null,
//     birthYear: null,
//     deathYear: null,
//     imageURL: '',
//     pgURL: '',
//     wikipediaURL: '',
//   },
// };

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import author from './authorReducer';
import book from './bookReducer';
import user from './userReducer';

const reducer = combineReducers({ author, book, user });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './authorReducer';
export * from './bookReducer';
export * from './userReducer';
