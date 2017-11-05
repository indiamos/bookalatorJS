// Composed in SingleBook as…
//   <BookMetadata book={book} />

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BookMetadata = ({ book }) => {
  const { Creators, pgURL, uniqueCount, wikipediaURL, wordCount, year } = book;
  let authorialElement;
  if (Creators) {
    if (Creators.length === 1) {
      const { id, firstName, lastName, birthYear, deathYear } = Creators[0];
      authorialElement = <li>by <Link to={`/authors/${id}`}>{firstName} {lastName} ({birthYear}–{deathYear})</Link></li>;
    } else {
      authorialElement = (
        <li>by
          <ul>{Creators.map((author) => {
            const { id, firstName, lastName, birthYear, deathYear } = author;
            return <li key={id}><Link to={`/authors/${id}`}>{firstName} {lastName} ({birthYear}–{deathYear})</Link></li>;
          })}</ul>
        </li>
      );
    }
  }

  return (
    <div className="book-metadata col-md-6 col-sm-8 col-xs-12">
      {book && (
        <ul>
          <li><h2>{book.title}</h2></li>
          {authorialElement}
          <li>Published in {year}</li>
          <li>Total words: {wordCount}</li>
          <li>Unique words: {uniqueCount}</li>
          <li>Learn more:
            <ul>
              <li><a href={pgURL} target="_blank">Project Gutenberg</a></li>
              <li><a href={wikipediaURL} target="_blank">Wikipedia</a></li>
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

BookMetadata.propTypes = {
  book: PropTypes.shape().isRequired,
};

export default BookMetadata;
