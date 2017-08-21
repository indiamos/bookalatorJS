import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BookWordTable = ({ bookId, wordMap, handleChange, wordMapSearchTerm = '' }) => {
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
            <form className="word-map-search col-xs-12" onChange={handleChange()}>
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

BookWordTable.propTypes = {
  bookId: PropTypes.number().isRequired,
  handleChange: PropTypes.func,
  wordMap: PropTypes.shape().isRequired,
  wordMapSearchTerm: PropTypes.string,
};

BookWordTable.defaultProps = {
  handleChange: () => console.log('handleChange was called'),
  wordMapSearchTerm: '',
};

export default BookWordTable;
