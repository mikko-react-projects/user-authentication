import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';

const LoginPage = () => (
  <div>
    <h1>Login Page</h1>

    <LoginForm />

    <Link to="/forgot_password">Forgot Password</Link>
  </div>
);

export default LoginPage;
