import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';


class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
    },
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({ errors: props.err });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data)
     }
  };

  validate = (data) => {
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  }

  render(){
    const { data, errors } = this.state;
    return(
      <Form onSubmit={this.onSubmit}>
      {errors.global && <Message negative>{errors.global}</Message>}
      <Form.Field error={!!errors.email}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          value={data.email}
          onChange={this.onChange}
        />
        {errors.email && <InlineError text={errors.email} />}
      </Form.Field>
        <Button primary>Send</Button>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    err: state.auth.error
  }
}

export default connect(mapStateToProps)(ForgotPasswordForm);
