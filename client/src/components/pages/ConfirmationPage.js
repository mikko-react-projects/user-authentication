import React from 'react';
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userConfirm } from "../../actions/auth";

class ConfirmationPage extends React.Component {

  componentDidMount() {
    this.props.userConfirm(this.props.match.params.token);
  }

  render() {
    const { loading, success } = this.props;

    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading && success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Thank you. Your account has been verified.
              </Message.Header>
              <Link to="/dashboard">Go to your dashboard</Link>
            </Message.Content>
          </Message>
        )}

        {!loading && !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Ooops. Invalid token it seems.</Message.Header>
            </Message.Content>
          </Message>
        )}

      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  userConfirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
};

function mapStateToProps(state){
	return{
    loading: state.auth.loading,
    success: state.auth.success
  }
}

export default connect(mapStateToProps, { userConfirm })(ConfirmationPage);
