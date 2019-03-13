import {
  FETCH_BOOKS,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  CREATE_BOOK,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  SEARCH_BOOKS,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE,
  REMOVE_BOOK,
  REMOVE_BOOK_SUCCESS,
  REMOVE_BOOK_FAILURE,
} from '../constants/actionTypes';

export const fetchBooks = () => ({
  type: FETCH_BOOKS
})

export const fetchBooksSuccess = books => ({
  type: FETCH_BOOKS_SUCCESS,
  books
})

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  error
})

export const createBook = data => ({
  type: CREATE_BOOK,
  data
})

export const createBookSuccess = data => ({
  type: CREATE_BOOK_SUCCESS,
  data
})

export const createBookFailure = error => ({
  type: CREATE_BOOK_FAILURE,
  error
})

export const searchBooks = data => ({
  type: SEARCH_BOOKS,
  data
})

export const searchBooksSuccess = books => ({
  type: SEARCH_BOOKS_SUCCESS,
  books
})

export const searchBooksFailure = error => ({
  type: SEARCH_BOOKS_FAILURE,
  error
})

export const removeBook = data => ({
  type: REMOVE_BOOK,
  data
})

export const removeBookSuccess = data => ({
  type: REMOVE_BOOK_SUCCESS,
  data
})

export const removeBookFailure = error => ({
  type: REMOVE_BOOK_FAILURE,
  error
})
