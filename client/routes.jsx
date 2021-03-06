import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { SingleAuthor, Login, Main, Signup, SingleBook, UserHome } from './components';
import { me } from './store';

/* ------------------------------- COMPONENT ------------------------------- */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path="/authors/:authorId" component={SingleAuthor} />
            <Route path="/books/:bookId" component={SingleBook} />
            <Route path="/books" component={SingleBook} />
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our SingleBook component as a fallback */}
            <SingleBook />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/* ------------------------------- CONTAINER ------------------------------- */

const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user
  // that has a truthy id. Otherwise, state.user will be an empty object, and
  // state.user.id will be falsey
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/* ------------------------------- PROP TYPES ------------------------------- */

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
