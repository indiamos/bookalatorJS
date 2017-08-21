import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookMetadata = ({ singleBook }) => (
  <div className="book-metadata">
    <ul>
      <li><i>{singleBook.title}</i></li>
      <li>by <Link to={`/authors/${singleBook.dummyAuthor.id}`}>{singleBook.dummyAuthor.authorLast} {singleBook.dummyAuthor.authorLast}</Link></li>
      <li>Year published: {singleBook.year}</li>
      <li>Learn more:
        <ul>
          <li><a href={singleBook.pgURL} target="_blank">Project Gutenberg</a></li>
          <li><a href={singleBook.wikipediaURL} target="_blank">Wikipedia</a></li>
        </ul>
      </li>
    </ul>
  </div>
);

BookMetadata.propTypes = {
  singleBook: PropTypes.obj.isRequired,
};

export default BookMetadata;
