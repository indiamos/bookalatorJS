// Composed in SingleBook as…
//   <BookSelector
//     bookList={bookList}
//     onChange={() => SelectorChange}
//     selectedBook={book ? book.id : null}
//     selectorID="leftSelector"
//   />

import PropTypes from 'prop-types';
import React from 'react';

// The book picker should really include the author name in each option,
// but I don't want to figure out how to pull it in right now.

// Warning: Failed form propType: You provided a `value` prop to a form field
// without an `onChange` handler. This will render a read-only field. If the field
// should be mutable use `defaultValue`. Otherwise, set either `onChange` or
// `readOnly`. Check the render method of `BookSelector`.
const BookSelector = ({
  bookList,
  selectorChange,
  selectedBook,
  selectorID,
}) => {
  console.log('BookSelector selectorChange', selectorChange);
  // https://www.dropbox.com/s/6t70idudftle9b3/Screenshot%202017-11-06%2018.11.50.png?dl=0
  const bookNo = selectorID === 'leftSelector' ? 1 : 2;
  return (
    <form id={selectorID} className="book-selector">
      <div className="form-group col-xs-12">
        <label className="col-xs-12 control-label" htmlFor={`book-picker-${bookNo}`}>Select
        book {bookNo}</label>
        <div className="book-selector-wrapper col-xs-12">
          <select className="form-control" value={selectedBook || '0'} onChange={selectorChange}>
            <option value="0">Choose another book to compare word lists</option>
            {
              bookList.map(({ id, title }) => (
                <option key={id} value={id}>Austen, Jane: {title}</option>
              ))
            }
          </select>
        </div>
      </div>
    </form>
  );
};

BookSelector.propTypes = {
  bookList: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  // selectorChange: PropTypes.func.isRequired,
  selectorChange: PropTypes.func.isRequired,
  selectedBook: PropTypes.number, // not the same as singleBook
  selectorID: PropTypes.string.isRequired,
};

BookSelector.defaultProps = {
  // selectorChange() { console.log('dummy selectorChange was called from BookSelector'); },
  selectedBook: 1,
};

export default BookSelector;
