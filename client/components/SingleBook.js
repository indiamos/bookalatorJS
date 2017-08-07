import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BookMetadata, BookSelector, BookThumbnail, BookWordTable } from '../components';
import { persuasionSentenceArray, persuasionWordMap } from '../store/fakeStore';

const dummyAuthor = {
  id: 1,
  firstName: 'Jane',
  lastName: 'Austen',
  gender: 'female',
  birthYear: 1775,
  deathYear: 1817,
  imageURL: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg',
  pgURL: 'https://www.gutenberg.org/ebooks/author/68',
  wikipediaURL: 'https://en.wikipedia.org/wiki/Jane_Austen',
};

const dummyBook = {
  id: 1,
  title: 'Persuasion',
  year: 1821,
  wordCount: 83710,
  uniqueCount: 6033,
  text: 'Chapter 1\n\nSir Walter Elliot, of Kellynch Hall, in Somersetshire, was a man who, for his own amusement, never took up any book but the Baronetage; there he found occupation for an idle hour, and consolation in a distressed one; there his faculties were roused into admiration and respect, by contemplating the limited remnant of the earliest patents; there any unwelcome sensations, arising from domestic affairs changed naturally into pity and contempt as he turned over the almost endless creations of the last century; and there, if every other leaf were powerless, he could read his own history with an interest which never failed.  This was the page at which the favourite volume always opened:\n\n"ELLIOT OF KELLYNCH HALL.\n\n"Walter Elliot, born March 1, 1760, married, July 15, 1784, Elizabeth, daughter of James Stevenson, Esq. of South Park, in the county of Gloucester, by which lady (who died 1800) he has issue Elizabeth, born June 1, 1785; Anne, born August 9, 1787; a still-born son, November 5, 1789; Mary, born November 20, 1791."\n\nPrecisely such had the paragraph originally stood from the printer\'s hands; but Sir Walter had improved it by adding, for the information of himself and his family, these words, after the date of Mary\'s birth--"Married, December 16, 1810, Charles, son and heir of Charles Musgrove, Esq. of Uppercross, in the county of Somerset," and by inserting most accurately the day of the month on which he had lost his wife.',
  coverURL: 'https://upload.wikimedia.org/wikipedia/commons/6/68/NorthangerPersuasionTitlePage.jpg',
  pgURL: 'http://www.gutenberg.org/ebooks/105',
  wikipediaURL: 'https://en.wikipedia.org/wiki/Persuasion_(novel)',
  sentenceArray: persuasionSentenceArray,
  wordMap: persuasionWordMap,
  author: dummyAuthor,
};

const dummyOnChange = () => console.log('onChange was invoked');

const SingleBook = ({
  books = [dummyBook],
  onChange = dummyOnChange,
  singleBook = dummyBook,
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
          selectedBook={singleBook.id}
          selectorID="rightSelector"
        />
        <p>Choose another book to&#160;compare</p>
      </div>
    </div>

    <div className="single-book row">
      <BookWordTable wordMap={singleBook.wordMap} bookId={singleBook.id} />
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
