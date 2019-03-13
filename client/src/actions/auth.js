import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILURE,
  USER_LOG_OUT,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILURE,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_CONFIRM,
  USER_CONFIRM_SUCCESS,
  USER_CONFIRM_FAILURE,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_REQUEST_SUCCESS,
  USER_RESET_PASSWORD_REQUEST_FAILURE,
  USER_VALIDATE_TOKEN,
  USER_VALIDATE_TOKEN_SUCCESS,
  USER_VALIDATE_TOKEN_FAILURE,
  USER_RESET_PASSWORD,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
} from '../constants/actionTypes';

export const userLogIn = data => ({
  type: USER_LOG_IN,
  data
})

export const userLogInSuccess = data => ({
  type: USER_LOG_IN_SUCCESS,
  data
})

export const userLogInFailure = error => ({
  type: USER_LOG_IN_FAILURE,
  error
})

export const userLogOut = () => ({
  type: USER_LOG_OUT
})

export const userLogOutSuccess = () => ({
  type: USER_LOG_OUT_SUCCESS
})

export const userLogOutFailure = error => ({
  type: USER_LOG_OUT_FAILURE,
  error
})

export const userSignup = data => ({
  type: USER_SIGNUP,
  data
})

export const userSignupSuccess = data => ({
  type: USER_SIGNUP_SUCCESS,
  data
})

export const userSignupFailure = error => ({
  type: USER_SIGNUP_FAILURE,
  error
})

export const userConfirm = data => ({
  type: USER_CONFIRM,
  data
})

export const userConfirmSuccess = data => ({
  type: USER_CONFIRM_SUCCESS,
  data
})

export const userConfirmFailure = error => ({
  type: USER_CONFIRM_FAILURE,
  error
})

export const userResetPasswordRequest = data => ({
  type: USER_RESET_PASSWORD_REQUEST,
  data
})

export const userResetPasswordRequestSuccess = data => ({
  type: USER_RESET_PASSWORD_REQUEST_SUCCESS,
  data
})

export const userResetPasswordRequestFailure = error => ({
  type: USER_RESET_PASSWORD_REQUEST_FAILURE,
  error
})

export const userValidateToken = data => ({
  type: USER_VALIDATE_TOKEN,
  data
})

export const userValidateTokenSuccess = data => ({
  type: USER_VALIDATE_TOKEN_SUCCESS,
  data
})

export const userValidateTokenFailure = error => ({
  type: USER_VALIDATE_TOKEN_FAILURE,
  error
})

export const userResetPassword = data => ({
  type: USER_RESET_PASSWORD,
  data
})

export const userResetPasswordSuccess = data => ({
  type: USER_RESET_PASSWORD_SUCCESS,
  data
})

export const userResetPasswordFailure = error => ({
  type: USER_RESET_PASSWORD_FAILURE,
  error
})
