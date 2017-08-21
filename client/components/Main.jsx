import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store';
import Navbar from './Navbar';

/* ----------------------- COMPONENT -----------------------
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props;

  return (
    <div id="main">
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        {children}
      </div>
    </div>
  );
};

/* ----------------------- CONTAINER ----------------------- */

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/* ----------------------- PROP TYPES ----------------------- */

Main.propTypes = {
  children: PropTypes.shape(),
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
