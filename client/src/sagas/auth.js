import { put, fork, takeLatest, call } from 'redux-saga/effects';
import history from '../history';
import api from '../api';
import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_SIGNUP,
  USER_CONFIRM,
  USER_RESET_PASSWORD_REQUEST,
  USER_VALIDATE_TOKEN,
  USER_RESET_PASSWORD,
} from '../constants/actionTypes';
import {
  userLogInSuccess, userLogInFailure,
  userLogOutSuccess, userLogOutFailure,
  userSignupSuccess, userSignupFailure,
  userConfirmSuccess, userConfirmFailure,
  userResetPasswordRequestSuccess, userResetPasswordRequestFailure,
  userValidateTokenSuccess, userValidateTokenFailure,
  userResetPasswordSuccess, userResetPasswordFailure,
} from '../actions/auth';

export function* userLogIn(action) {
  try {
    const user = yield call(api.user.login, action.data);
    localStorage.bookwormJWT = user.token;
    yield put(userLogInSuccess(user));
    yield call([history, history.push], '/dashboard');
    yield put(window.location.reload());
  } catch(error) {
    yield put(userLogInFailure(error.response.data));
  }
}

export function* userLogOut(action) {
  try {
    localStorage.removeItem('bookwormJWT');
    yield put(userLogOutSuccess());
    yield call([history, history.push], '/');
  } catch(error) {
    yield put(userLogOutFailure(error));
  }
}

export function* userSignup(action) {
  try {
    const user = yield call(api.user.signup, action.data);
    localStorage.bookwormJWT = user.token;
    yield put(userSignupSuccess(user));
    yield call([history, history.push], '/dashboard');
  } catch(error) {
    yield put(userSignupFailure(error.response.data));
  }
}

export function* userConfirm(action) {
  try {
    const user = yield call(api.user.confirm, action.data);
    localStorage.bookwormJWT = user.token;
    yield put(userConfirmSuccess(user));
  } catch(error) {
    yield put(userConfirmFailure(error.response.data));
  }
}

export function* userResetPasswordRequest(action) {
  try {
    const request = yield call(api.user.resetPasswordRequest, action.data.email);
    yield put(userResetPasswordRequestSuccess(request));
  } catch(error) {
    yield put(userResetPasswordRequestFailure(error.response.data));
  }
}

export function* userValidateToken(action) {
  try {
    const token = yield call(api.user.validateToken, action.data);
    yield put(userValidateTokenSuccess(token));
  } catch(error) {
    yield put(userValidateTokenFailure(error.response.data));
  }
}

export function* userResetPassword(action) {
  try {
    const data = yield call(api.user.resetPassword, action.data);
    yield put(userResetPasswordSuccess(data));
  } catch(error) {
    yield put(userResetPasswordFailure(error.response.data));
  }
}

export function* watchUserLogOut() {
  yield takeLatest(USER_LOG_OUT, userLogOut);
}

export function* watchUserLogIn() {
  yield takeLatest(USER_LOG_IN, userLogIn);
}

export function* watchUserSignup() {
  yield takeLatest(USER_SIGNUP, userSignup);
}

export function* watchUserConfirm() {
  yield takeLatest(USER_CONFIRM, userConfirm);
}

export function* watchUserResetPasswordRequest() {
  yield takeLatest(USER_RESET_PASSWORD_REQUEST, userResetPasswordRequest);
}

export function* watchUserValidateToken() {
  yield takeLatest(USER_VALIDATE_TOKEN, userValidateToken);
}

export function* watchUserResetPassword() {
  yield takeLatest(USER_RESET_PASSWORD, userResetPassword);
}

export default function* () {
  yield fork(watchUserLogIn);
  yield fork(watchUserLogOut);
  yield fork(watchUserSignup);
  yield fork(watchUserConfirm);
  yield fork(watchUserResetPasswordRequest);
  yield fork(watchUserValidateToken);
  yield fork(watchUserResetPassword);
}
