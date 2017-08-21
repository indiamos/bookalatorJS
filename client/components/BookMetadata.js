import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const BookMetadata = ({ singleBook }) => {
  const author = singleBook.author;
  // console.log(author);

  return (
    <div className="book-metadata col-md-6 col-sm-8 col-xs-12">
      <ul>
        <li><h2>{singleBook.title}</h2></li>
        <li>by <Link to={`/authors/${author.id}`}>{author.firstName} {author.lastName} ({author.birthYear}–{author.deathYear})</Link></li>
        <li>Published in {singleBook.year}</li>
        <li>Total words: {singleBook.wordCount}</li>
        <li>Unique words: {singleBook.uniqueCount}</li>
        <li>Learn more:
          <ul>
            <li><a href={singleBook.pgURL} target="_blank">Project Gutenberg</a></li>
            <li><a href={singleBook.wikipediaURL} target="_blank">Wikipedia</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

// BookMetadata.propTypes = {
//   singleBook: PropTypes.shape.isRequired,
// };

export default BookMetadata;
