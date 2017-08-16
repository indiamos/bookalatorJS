import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookWordTable = ({ bookId, wordMap, onChange, wordMapSearchTerm = '' }) => {
  console.log('wordMap:', wordMap);

  return (
    <table className="book-word-table">
      <thead>
        <tr>
          <th>Occurrences &nbsp;
            &nbsp; <span className="glyphicon glyphicon-sort" aria-hidden="true" />
          </th>
          <th>Word &nbsp;
            &nbsp; <span className="glyphicon glyphicon-sort" aria-hidden="true" />
          </th>
        </tr>
        <tr>
          <td colSpan="2">
            <form className="word-map-search col-xs-12" onChange={onChange()}>
              <input className="form-control" value={wordMapSearchTerm} />
              <span className="search-icon glyphicon glyphicon-search" aria-hidden="true" />
            </form>
          </td>
        </tr>
      </thead>
      <tbody>
        {
          Object.entries(wordMap).map(word => (
            <tr key={word[0]}>
              <td className="book-word-table-count"><Link to={`/api/books/${bookId}/sentences/${word[0]}`}>{word[1]}</Link></td>
              <td><Link to={`/api/words/${word[0]}`}>{word[0]}</Link></td>
            </tr>
          ),
          )
        }
      </tbody>
    </table>
  );
};

// BookWordTable.propTypes = {
//   wordMap: PropTypes.shape.isRequired,
//   bookId: PropTypes.number.isRequired,
// };

export default BookWordTable;
