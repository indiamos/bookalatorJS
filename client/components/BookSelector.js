import React from 'react';
import PropTypes from 'prop-types';

// The book picker should really include the author name in each option,
// but I don't want to figure out how to pull it in right now.
const BookSelector = ({ books, onChange, selectedBook, selectorID }) => (
  <form id={selectorID} className="book-selector form-horizontal" onChange={onChange()}>
    <div className="form-group">
      <label className="col-sm-12 col-md-4 control-label" htmlFor="book-picker-1">Select
      book 1</label>
      <div className="col-sm-12 col-md-8">
        <select className="form-control">
          {
            books.map(book => (
              selectedBook
                ? <option key={book.id} value={book.id} selected>{book.title}</option>
                : <option key={book.id} value={book.id}>{book.title}</option>
            ))
          }
        </select>
      </div>
    </div>
  </form>
);

// BookSelector.propTypes = {
//   books: PropTypes.arrayOf(
//     PropTypes.shape.isRequired,
//   ).isRequired,
//   onChange: PropTypes.func.isRequired,
//   selectedBook: PropTypes.number, // not the same as singleBook
//   selectorID: PropTypes.string.isRequired,
// };

// BookSelector.defaultProps = {
//   selectedBook: 1,
// };

export default BookSelector;
