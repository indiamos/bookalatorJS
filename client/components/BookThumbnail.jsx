import PropTypes from 'prop-types';
import React from 'react';

const BookThumbnail = ({ coverURL, title }) => (
  <figure className="book-thumbnail col-md-6 col-sm-4 col-xs-12">
    <img src={coverURL} alt={`Cover of ${title}`} />
  </figure>
);

BookThumbnail.propTypes = {
  // coverURL: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  coverURL: PropTypes.string,
  title: PropTypes.string,
};

BookThumbnail.defaultProps = {
  coverURL: 'http://placeimg.com/480/640/animals',
  title: 'The Null Title',
};

export default BookThumbnail;
