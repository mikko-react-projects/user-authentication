import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { userValidateToken, userResetPassword } from '../../actions/auth';

class ResetPasswordPage extends React.Component {

  componentDidMount() {
    this.props.userValidateToken(this.props.match.params.token);
  }

  submit = data => this.props.userResetPassword(data);

  render() {
    const { loading, success } = this.props;
    const token = this.props.match.params.token;

    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading &&
        success && <ResetPasswordForm submit={this.submit} token={token} />}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
    );
  }
}

function mapStateToProps(state){
	return{
    loading: state.auth.loading,
    success: state.auth.success
  }
}

ResetPasswordPage.propTypes = {
  userValidateToken: PropTypes.func.isRequired,
  userResetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { userValidateToken, userResetPassword })(ResetPasswordPage);
