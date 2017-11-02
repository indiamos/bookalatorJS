import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSingleAuthor } from '../store';

class SingleAuthor extends Component {
  componentDidMount() {
    const authorId = +this.props.match.params.authorId;
    this.props.loadAuthor(authorId);
  }

  render() {
    const {
      firstName,
      lastName,
      // pronouns,
      birthYear,
      deathYear,
      imageURL,
      pgURL,
      wikipediaURL,
    } = this.props.author;
    return (
      <div className="single-author col-lg-8 col-lg-offset-2">
        <div className="single-author row">
          <div className="left-author-card col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <figure><img src={imageURL} alt={`${firstName} ${lastName}`} /></figure>
          </div>

          <div className="right-author-card col-xs-12 col-sm-8 col-md-9 col-lg-10">
            <div className="author-metadata">
              <h1>{firstName} {lastName}</h1>
              { birthYear || deathYear ? <p>{birthYear ? `${birthYear}–` : '?–'}{deathYear ? `${deathYear}` : '?–'}</p> : null}
              <ul className="external-links">
                {pgURL ? <li><a href={pgURL} target="_blank">Project Gutenberg</a></li> : null}
                {wikipediaURL ? <li><a href={wikipediaURL} target="_blank">Wikipedia</a></li> : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  author: state.author,
});

const mapDispatch = dispatch => ({
  loadAuthor(authorId) { return dispatch(fetchSingleAuthor(authorId)); },
});

export default withRouter(connect(mapState, mapDispatch)(SingleAuthor));

/* -------------- PROP TYPES -------------- */

SingleAuthor.propTypes = {
  author: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    // pronouns: PropTypes.number,
    birthYear: PropTypes.number,
    deathYear: PropTypes.number,
    imageURL: PropTypes.string,
    pgURL: PropTypes.string,
    wikipediaURL: PropTypes.string,
  }),
  loadAuthor: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      authorId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

SingleAuthor.defaultProps = {
  author: {
    firstName: '',
    lastName: '',
    // pronouns: null,
    birthYear: null,
    deathYear: null,
    imageURL: '',
    pgURL: '',
    wikipediaURL: '',
  },
};
