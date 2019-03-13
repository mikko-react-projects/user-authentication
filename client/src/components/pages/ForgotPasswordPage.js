import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { userResetPasswordRequest } from "../../actions/auth";

class ForgotPasswordPage extends React.Component {

  submit = data => this.props.userResetPasswordRequest(data);

  render() {

    const { success } = this.props;

    return (
      <div>
      {success ? (
        <Message>Email has been sent. Go to your email and follow the link. You have 1 hour to reset your password</Message>
      ) : (
        <ForgotPasswordForm submit={this.submit} />
      )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  userResetPasswordRequest: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired
};

function mapStateToProps(state){
	return{
    success: state.auth.success
  }
}

export default connect(mapStateToProps, { userResetPasswordRequest})(ForgotPasswordPage);
