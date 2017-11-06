import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { SingleBook } from '../components';
import { fetchBookList, fetchSingleBook } from '../store';

class CompareBooks extends Component {
  constructor() {
    super();

    this.leftSelectorChange = this.leftSelectorChange.bind(this);
    this.rightSelectorChange = this.rightSelectorChange.bind(this);
  }

  componentDidMount() {
    this.props.loadBookList();
  }

  leftSelectorChange({ target }) {
    this.props.loadLeftBook(target.value);
  }

  rightSelectorChange({ target }) {
    this.props.loadRightBook(target.value);
  }

  render() {
    const { bookList, leftBook, rightBook } = this.props;
    const { leftSelectorChange, rightSelectorChange } = this;
    return (
      <DocumentTitle title="Compare Books | Bookalator">
        <div className="compare-books col-lg-8 col-lg-offset-2">
          {bookList && <div className="row">
            <SingleBook book={leftBook} bookList={bookList} selectorChange={leftSelectorChange} selectorID="leftSelector" />
            <SingleBook book={rightBook} bookList={bookList} selectorChange={rightSelectorChange} selectorID="rightSelector" />
          </div>}
        </div>
      </DocumentTitle>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  bookList: state.book.bookList,
  leftBook: state.leftBook,
  rightBook: state.rightBook,
});

const mapDispatch = dispatch => ({
  loadBookList() { return dispatch(fetchBookList()); },
  loadLeftBook(bookId) { return dispatch(fetchSingleBook(bookId, 'leftBook')); },
  loadRightBook(bookId) { return dispatch(fetchSingleBook(bookId, 'rightBook')); },
});

export default connect(mapState, mapDispatch)(CompareBooks);

/* -------------- PROP TYPES -------------- */

CompareBooks.propTypes = {
  book: PropTypes.shape(),
  bookList: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  leftBook: PropTypes.shape(),
  loadBookList: PropTypes.func.isRequired,
  loadLeftBook: PropTypes.func.isRequired,
  loadRightBook: PropTypes.func.isRequired,
  rightBook: PropTypes.shape(),
};

CompareBooks.defaultProps = {
  book: {},
  bookList: [],
  rightBook: null,
  leftBook: null,
};
