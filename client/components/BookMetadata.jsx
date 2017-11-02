import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BookMetadata = ({ singleBook }) => {
  const { author, pgURL, uniqueCount, wikipediaURL, wordCount, year } = singleBook;
  const { firstName, lastName, birthYear, deathYear } = author;
  console.log('author:', author);

  return (
    <div className="book-metadata col-md-6 col-sm-8 col-xs-12">
      <ul>
        <li><h2>{singleBook.title}</h2></li>
        <li>by <Link to={`/authors/${author.id}`}>{firstName} {lastName} ({birthYear}–{deathYear})</Link></li>
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
    </div>
  );
};

BookMetadata.propTypes = {
  singleBook: PropTypes.shape({
    author: PropTypes.shape(),
    pgURL: PropTypes.string,
    uniqueCount: PropTypes.number,
    wikipediaURL: PropTypes.string,
    wordCount: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
};

export default BookMetadata;
