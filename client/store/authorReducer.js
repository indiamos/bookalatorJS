import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
  gender: null,
  birthYear: null,
  deathYear: null,
  imageURL: '',
  pgURL: '',
  wikipediaURL: '',
};

/* -----------------    ACTION TYPES ------------------ */

const GET_AUTHOR_LIST = 'GET_AUTHOR_LIST';
const GET_SINGLE_AUTHOR = 'GET_SINGLE_AUTHOR';

/* ------------   ACTION CREATORS     ------------------ */

const getAuthorList = authorList => ({ type: GET_AUTHOR_LIST, authorList });
const getSingleAuthor = singleAuthor => ({ type: GET_SINGLE_AUTHOR, singleAuthor });

/* ------------   THUNK CREATORS     ------------------ */

export const fetchAuthorList = () => dispatch => axios.get('/api/authors')
  .then(res => dispatch(getAuthorList(res.data)))
  .catch(err => console.error('Fetching authors unsuccessful', err));

export const fetchSingleAuthor = authorId => dispatch => axios.get(`/api/authors/${authorId}`)
  .then(res => dispatch(getSingleAuthor(res.data)))
  .catch(err => console.error('Fetching author unsuccessful', err));

// Not using these, because there's no friendly admin interface
// export const createAuthor = (author) => dispatch => {
//         axios.post('/api/authors', author)
//         .then(res => dispatch(getSingleAuthor(res.data)))
//         .catch(error => { console.log( error) });
// };

// export const changeAuthor = (authorId, author) => dispatch => {
//         axios.put(`/api/authors/${authorId}`, author)
//         .then(res => dispatch(getSingleAuthor(res.data)))
//         .catch(error => { console.log( error) });
// };

// export const deleteAuthor = (authorId) => dispatch => {
//         axios.delete(`/api/authors/${authorId}`)
//         .catch(error => { console.log(error) });
// };

/* ------------       REDUCERS     ------------------ */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AUTHOR_LIST:
      return Object.assign({}, state, action.authorList);
    case GET_SINGLE_AUTHOR:
      return Object.assign({}, state, action.singleAuthor);
    default:
      return state;
  }
}
