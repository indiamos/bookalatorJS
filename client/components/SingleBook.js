import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { BookMetadata, BookSelector, BookThumbnail, BookWordTable } from '../components';
import {
  dummyAuthor,
  // dummyBook,
  dummyComparisonBook,
  dummyOnChange,
  persuasionSentenceArray,
  persuasionWordMap
} from '../store/fakeStore';

const dummyBook = {
  id: 1,
  title: 'Persuasion',
  year: 1821,
  wordCount: 83710,
  uniqueCount: 6033,
  coverURL: 'https://upload.wikimedia.org/wikipedia/commons/6/68/NorthangerPersuasionTitlePage.jpg',
  pgURL: 'http://www.gutenberg.org/ebooks/105',
  wikipediaURL: 'https://en.wikipedia.org/wiki/Persuasion_(novel)',
  sentenceArray: persuasionSentenceArray,
  wordMap: persuasionWordMap,
  author: dummyAuthor,
};

console.log('dummyBook:', dummyBook);
// console.log('dummyBook.wordMap:', dummyBook.wordMap);

const SingleBook = ({
  books = [dummyBook],
  onChange = dummyOnChange,
  singleBook = dummyBook,
  comparisonBook = dummyComparisonBook,
}) => (
  <div className="single-book col-lg-8 col-lg-offset-2">
    <div className="single-book row">
      <div className="left-book-card col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <BookSelector
          books={books}
          onChange={onChange}
          selectedBook={singleBook.id}
          selectorID="leftSelector"
        />
        <div className="book-thumb-meta row">
          <BookThumbnail coverURL={singleBook.coverURL} title={singleBook.title} />
          <BookMetadata singleBook={singleBook} />
        </div>
      </div>

      <div className="right-book-card col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <BookSelector
          books={books}
          onChange={onChange}
          selectedBook={comparisonBook.id}
          selectorID="rightSelector"
        />
      </div>
    </div>

    <div className="single-book row">
      <BookWordTable
        wordMap={singleBook.wordMap}
        bookId={singleBook.id}
        onChange={onChange}
      />
    </div>
  </div>
);

// SingleBook.propTypes = {
//   books: PropTypes.arrayOf(
//     PropTypes.shape,
//   ),
//   onChange: PropTypes.func,
//   singleBook: PropTypes.shape,
// };

// SingleBook.defaultProps = {
//   books: [],
//   onChange: () => console.log('onChange was invoked'),
//   singleBook: {},
// };

export default SingleBook;
