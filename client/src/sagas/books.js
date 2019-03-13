import { put, fork, takeLatest, takeEvery, call } from 'redux-saga/effects';
import history from '../history';
import api from '../api';
import {
  FETCH_BOOKS,
  CREATE_BOOK,
  SEARCH_BOOKS,
  REMOVE_BOOK
} from '../constants/actionTypes';
import {
  fetchBooksSuccess, fetchBooksFailure,
  createBookSuccess, createBookFailure,
  searchBooksSuccess, searchBooksFailure,
  removeBookSuccess, removeBookFailure,
} from '../actions/books';

export function* fetchBooks(action) {
  try {
    const books = yield call(api.books.fetchBooks);
    yield put(fetchBooksSuccess(books));
  } catch(error) {
    yield put(fetchBooksFailure(error.response.data));
  }
}

export function* createBook(action) {
  try {
    const book = yield call(api.books.createBook, action.data);
    yield put(createBookSuccess(book));
    yield call([history, history.push], '/dashboard');
  } catch(error) {
    yield put(createBookFailure(error.response.data));
  }
}

export function* searchBooks(action) {
  try {
    const books = yield call(api.books.searchBooks, JSON.stringify(action.data));
    yield put(searchBooksSuccess(books));
  } catch(error) {
    yield put(searchBooksFailure(error.response.data));
  }
}

export function* removeBook(action) {
  try {
    const book = yield call(api.books.removeBook, action.data);
    yield put(removeBookSuccess(book));
  } catch(error) {
    yield put(removeBookFailure(error.response.data));
  }
}

export function* watchFetchBooks() {
  yield takeEvery(FETCH_BOOKS, fetchBooks);
}

export function* watchCreateBook() {
  yield takeLatest(CREATE_BOOK, createBook);
}

export function* watchSearchBooks() {
  yield takeLatest(SEARCH_BOOKS, searchBooks);
}

export function* watchRemoveBook() {
  yield takeLatest(REMOVE_BOOK, removeBook);
}

export default function* () {
  yield fork(watchFetchBooks);
  yield fork(watchCreateBook);
  yield fork(watchSearchBooks);
  yield fork(watchRemoveBook);
}
