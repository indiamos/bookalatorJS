import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
// import history from './history';
import {Main, UserHome} from './components';
// import {me} from './store';

/* ----------------------- COMPONENT ----------------------- */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    // const {isLoggedIn} = this.props

    return (
      <Router>
        <Main>
          <Switch>
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
  }
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
    }
  }
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
