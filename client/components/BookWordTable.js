import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookWordTable = ({ bookId, wordMap }) => (
  <table className="book-word-table">
    <thead>
      <tr>
        <th>Times used</th>
        <th>Word</th>
      </tr>
    </thead>
    <tbody>
      {
        Object.entries(wordMap).map(word => (
          <tr key={word[1]}>
            <td><Link to={`/books/${bookId}/sentences/${word[1]}`}>{word[1]}</Link></td>
            <td><Link to={`/words/${word[0]}`}>{word[0]}</Link></td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

// BookWordTable.propTypes = {
//   wordMap: PropTypes.shape.isRequired,
//   bookId: PropTypes.number.isRequired,
// };

export default BookWordTable;
