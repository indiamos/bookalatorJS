// Composed in CompareBooks as…
//   <SingleBook
//     book={leftBook}
//     bookList={bookList}
//     SelectorChange={leftSelectorChange}
//     selectorID="leftSelector"
//   />
//   <SingleBook book={rightBook}
//     bookList={bookList}
//     SelectorChange={rightSelectorChange}
//     selectorID="rightSelector"
//    />

import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import {
  BookMetadata,
  BookSelector,
  BookThumbnail,
  BookWordTable,
} from '../components';

const SingleBook = ({
  book,
  bookList,
  SelectorChange,
  selectorID,
}) => (
  <DocumentTitle title={`${book ? book.shortTitle : 'Single Book'} | Bookalator`}>
    <div className="single-book col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <BookSelector
        bookList={bookList}
        onChange={() => SelectorChange}
        selectedBook={book ? book.id : null}
        selectorID={selectorID}
      />
      {book && (
        <div className="book-details">
          <div className="book-thumb-meta row">
            <BookThumbnail coverURL={book.coverURL} title={book.title} />
            <BookMetadata book={book} />
          </div>

          <div className="single-book row">
            <BookWordTable bookId={book.id} selectorID={selectorID} />
          </div>
        </div>
      )}
    </div>
  </DocumentTitle>
);

SingleBook.propTypes = {
  book: PropTypes.shape(),
  bookList: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  SelectorChange: PropTypes.func,
  selectorID: PropTypes.string,
};

SingleBook.defaultProps = {
  book: null,
  bookList: [],
  SelectorChange: () => {},
  selectorID: '',
};

export default SingleBook;
