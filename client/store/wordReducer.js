import axios from 'axios';

const initialState = {
  leftWordMap: {},
  rightWordMap: {},
};

/* -----------------    ACTION TYPES ------------------ */

const GET_LEFT_WORD_MAP = 'GET_LEFT_WORD_MAP';
const GET_RIGHT_WORD_MAP = 'GET_RIGHT_WORD_MAP';
const NO_WORD_MAP = 'NO_WORD_MAP';

/* ------------   ACTION CREATORS     ------------------ */

const getWordMap = (wordMap, selectorID) => {
  switch (selectorID) {
    case 'leftSelector':
      return { type: GET_LEFT_WORD_MAP, leftWordMap: wordMap };
    case 'rightSelector':
      return { type: GET_RIGHT_WORD_MAP, rightWordMap: wordMap };
    default:
      return { type: NO_WORD_MAP };
  }
};

/* ------------   THUNK CREATORS     ------------------ */

export const fetchWordMap = (bookId, selectorID) => dispatch => axios.get(`/api/books/${bookId}/words`)
  .then(res => dispatch(getWordMap(res.data, selectorID)))
  .catch(err => console.error('Fetching words unsuccessful', err));

/* ------------       REDUCERS     ------------------ */

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEFT_WORD_MAP:
      return Object.assign({}, state, { leftWordMap: action.leftWordMap });
    case GET_RIGHT_WORD_MAP:
      return Object.assign({}, state, { rightWordMap: action.rightWordMap });
    case NO_WORD_MAP:
    default:
      return state;
  }
}
