import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogOut } from '../../actions/auth';

const HomePage = ({ isAuthenticated, userLogout }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? (
      <button onClick={() => userLogout()}>Logout</button>
    ) : (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userLogOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.data.token
  }
}

export default connect(mapStateToProps, { userLogOut })(HomePage);
