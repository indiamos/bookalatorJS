// Composed in SingleBook as…
//   <BookWordTable
//     bookId={book.id}
//     selectorID={selectorID}
//   />

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchWordMap } from '../store';

class BookWordTable extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadWordMap(this.props.bookId, this.props.selectorID);
  }

  handleChange({ target }) {
    this.setState({ searchTerm: target.value });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    console.log('You hit "submit."');
  }

  render() {
    const {
      bookId,
      selectorID,
      words,
    } = this.props;

    const wordMap = selectorID === 'leftSelector' ? words.leftWordMap : words.rightWordMap;

    return (
      <table className="book-word-table">
        <thead>
          <tr>
            <th>Occurrences &nbsp;
              &nbsp; <span className="glyphicon glyphicon-sort" aria-hidden="true" />
            </th>
            <th>Word &nbsp;
              &nbsp; <span className="glyphicon glyphicon-sort" aria-hidden="true" />
            </th>
          </tr>
          <tr>
            <td colSpan="2">
              <form className="word-map-search col-xs-12" onSubmit={this.handleSearchSubmit}>
                <input
                  type="text"
                  name="searchTerm"
                  className="form-control"
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                />
                <span className="search-icon glyphicon glyphicon-search" aria-hidden="true" />
              </form>
            </td>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(wordMap).map(word => (
              <tr key={word[0]}>
                <td className="book-word-table-count"><Link to={`/api/books/${bookId}/sentences/${word[0]}`}>{word[1]}</Link></td>
                <td><Link to={`/api/words/${word[0]}`}>{word[0]}</Link></td>
              </tr>
            ),
            )
          }
        </tbody>
      </table>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  words: state.words,
});

const mapDispatch = dispatch => ({
  loadWordMap(bookId, selectorID) { return dispatch(fetchWordMap(bookId, selectorID)); },
});

export default connect(mapState, mapDispatch)(BookWordTable);

/* -------------- PROP TYPES -------------- */

BookWordTable.propTypes = {
  bookId: PropTypes.number.isRequired,
  loadWordMap: PropTypes.func.isRequired,
  selectorID: PropTypes.string,
  words: PropTypes.shape(),
  // searchTerm: PropTypes.string,
};

BookWordTable.defaultProps = {
  bookId: 1,
  selectorID: '',
  words: {},
  // searchTerm: '',
};
