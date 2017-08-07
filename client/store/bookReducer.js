import axios from 'axios';
// import history from '../history';

/* -----------------    INITIAL STATE ------------------ */

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

const intialState = {
  books: [],
  bookSet1: [],
  bookSet2: [],
  singleBook: {},
};

/* -----------------    ACTION TYPES ------------------ */

const GET_BOOK_LIST = 'GET_BOOK_LIST';
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK';

/* ------------   ACTION CREATORS     ------------------ */

const getBookList = bookList => ({ type: GET_BOOK_LIST, bookList });
const getSingleBook = singleBook => ({ type: GET_SINGLE_BOOK, singleBook });

/* ------------   THUNK CREATORS     ------------------ */

export const fetchBookList = () => dispatch =>
  axios.get('/api/books')
    .then(res => dispatch(getBookList(res.data)))
    .catch(err => console.error('Fetching books unsuccessful', err));

export const fetchSingleBook = bookId => dispatch =>
  axios.get(`/api/books/${bookId}`)
    .then(res => dispatch(getSingleBook(res.data)))
    .catch(err => console.error('Fetching book unsuccessful', err));

// Not using these, because there's no friendly admin interface
// export const createBook = (book) => dispatch => {
//         axios.post('/api/books', book)
//         .then(res => dispatch(getSingleBook(res.data)))
//         .catch(error => { console.log( error) });
// };

// export const changeBook = (bookId, book) => dispatch => {
//         axios.put(`/api/books/${bookId}`, book)
//         .then(res => dispatch(getSingleBook(res.data)))
//         .catch(error => { console.log( error) });
// };

// export const deleteBook = (bookId) => dispatch => {
//         axios.delete(`/api/books/${bookId}`)
//         .catch(error => { console.log(error) });
// };

/* ------------       REDUCERS     ------------------ */

export default function (state = intialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_BOOK_LIST:
      newState.bookList = action.bookList;
      break;
    case GET_SINGLE_BOOK:
      newState.singleBook = action.singleBook;
      break;
    default:
      return state;
  }
  return newState;
}
