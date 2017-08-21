import React from 'react';
import PropTypes from 'prop-types';

// The book picker should really include the author name in each option,
// but I don't want to figure out how to pull it in right now.

// Warning: Failed form propType: You provided a `value` prop to a form field
// without an `onChange` handler. This will render a read-only field. If the field
// should be mutable use `defaultValue`. Otherwise, set either `onChange` or
// `readOnly`. Check the render method of `BookSelector`.
const BookSelector = ({ books, handleChange, selectedBook, selectorID }) => {
  const bookNo = selectorID === 'leftSelector' ? 1 : 2;
  return (
    <form id={selectorID} className="book-selector" onChange={handleChange()}>
      <div className="form-group col-xs-12">
        <label className="col-xs-12 control-label" htmlFor={`book-picker-${bookNo}`}>Select
        book {bookNo}</label>
        <div className="book-selector-wrapper col-xs-12">
          <select className="form-control" value={selectedBook} onChange={handleChange}>
            <option value="0">Choose another book to compare word lists</option>
            {
              books.map(book => (
                <option key={book.id} value={book.id}>Austen, Jane: {book.title}</option>
              ))
            }
          </select>
        </div>
      </div>
    </form>
  );
};

BookSelector.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape.isRequired,
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedBook: PropTypes.number, // not the same as singleBook
  selectorID: PropTypes.string.isRequired,
};

BookSelector.defaultProps = {
  selectedBook: 1,
};

export default BookSelector;
