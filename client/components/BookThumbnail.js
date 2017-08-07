import React from 'react';
import PropTypes from 'prop-types';

const BookThumbnail = ({ coverURL, title }) => (
  <figure className="book-thumbnail">
    <img src={coverURL} alt={`Cover of ${title}`} />
  </figure>
);

BookThumbnail.propTypes = {
  coverURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default BookThumbnail;
