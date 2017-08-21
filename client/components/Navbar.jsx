import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({
  // isLoggedIn
  // value,
  // handleChange,
  // options
}) => (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="false"
        aria-controls="navbar"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <Link className="navbar-brand" to="/books"><span><img
        src="/img/noun_973057_cc_F38F19_reflected.png"
        alt="book icon"
      /></span>Bookalator</Link>
    </div>
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav">
        <li className="active"><Link to="/books">Books</Link></li>
        <li><Link to="/words">Words</Link></li>
        <li><Link to="/authors">Authors</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about/colophon">Colophon</Link></li>
        <li role="separator" className="divider" />
        <li><Link to="https://github.com/indiamos/bookalatorJS/">View on GitHub</Link></li>
        <li role="separator" className="divider" />
      </ul>
    </div>
  </nav>
);

// Navbar.propTypes = {
//   options: PropTypes.arrayOf(
//     PropTypes.string.isRequired,
//   ).isRequired,
//   handleChange: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };

export default Navbar;
