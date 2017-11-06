import axios from 'axios';

const initialState = {
  bookList: [],
  // books: [],
  // bookSet1: [],
  // bookSet2: [],
  singleBook: {},
};

/* -----------------    ACTION TYPES ------------------ */

const GET_BOOK_LIST = 'GET_BOOK_LIST';
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK';

/* ------------   ACTION CREATORS     ------------------ */

const getBookList = bookList => ({ type: GET_BOOK_LIST, bookList });
const getSingleBook = singleBook => ({ type: GET_SINGLE_BOOK, singleBook });

/* ------------   THUNK CREATORS     ------------------ */

export const fetchBookList = () => dispatch => axios.get('/api/books')
  .then(res => dispatch(getBookList(res.data)))
  .catch(err => console.error('Fetching books unsuccessful', err));

export const fetchSingleBook = bookId => dispatch => axios.get(`/api/books/${bookId}`)
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

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_LIST:
      return { ...state, bookList: action.bookList };
    case GET_SINGLE_BOOK:
      return { ...state, singleBook: action.singleBook };
    default:
      return state;
  }
}
