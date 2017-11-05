import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { SingleBook } from '../components';
import {
  bookList,
  // dummyAuthor,
  dummyLeftBook,
  // dummyRightBook,
  dummyHandleChange,
  // persuasionSentenceArray,
  // persuasionWordMap,
} from '../store/fakeStore';

const CompareBooks = ({
  leftBook = dummyLeftBook,
  leftSelectorChange = dummyHandleChange,
  rightBook = null,
  rightSelectorChange = dummyHandleChange,
}) => (
  <DocumentTitle title="Compare Books | Bookalator">
    <div className="compare-books col-lg-8 col-lg-offset-2">
      <div className="row">
        <SingleBook book={leftBook} bookList={bookList} SelectorChange={leftSelectorChange} selectorID="leftSelector"/>
        <SingleBook book={rightBook} bookList={bookList} SelectorChange={rightSelectorChange} selectorID="rightSelector" />
      </div>
    </div>
  </DocumentTitle>
);

CompareBooks.propTypes = {
  // bookList: PropTypes.arrayOf(
  //   PropTypes.shape(),
  // ).isRequired,
  // books: PropTypes.arrayOf(
  //   PropTypes.shape(),
  // ),
  // dummyHandleChange: PropTypes.func.isRequired,
  leftSelectorChange: PropTypes.func,
  rightSelectorChange: PropTypes.func,
  leftBook: PropTypes.shape(),
  rightBook: PropTypes.shape(),
};

CompareBooks.defaultProps = {
  // books: [],
  rightBook: null,
  leftSelectorChange: dummyHandleChange,
  rightSelectorChange: dummyHandleChange,
  leftBook: dummyLeftBook,
};

export default CompareBooks;
