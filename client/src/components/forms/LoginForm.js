import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import { userLogIn } from '../../actions/auth';


class LoginForm extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({ errors: props.err });
  }


  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
     }
  };

  validate = (data) => {
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if(!data.password) errors.password = 'Cant be blank';
    return errors;
  }

  render(){
    const { data, errors } = this.state;
    const { loading } = this.props;

    return(

      <Form onSubmit={this.onSubmit} loading={loading}>
        { errors.global &&
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.global}</p>
            </Message>
        }
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

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Login</Button>
      </Form>

    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    err: state.auth.error
  }
}

export default connect(mapStateToProps, { submit: userLogIn })(LoginForm);
