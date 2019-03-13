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

const initialState = {
  data: [],
  books: [],
  loading: false,
  error: []
}

export default function books(state = initialState, action={}) {
  switch(action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        data: [],
        books: [],
        loading: true,
        error: []
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        data: [],
        books: action.books,
        loading: false,
        error: []
      }
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        data: [],
        books: [],
        loading: false,
        error: action.error
      }
    case CREATE_BOOK:
      return {
        ...state,
        data: action.data,
        books: [],
        loading: true,
        error: []
      }
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        data: action.data,
        books: [],
        loading: false,
        error: []
      }
    case CREATE_BOOK_FAILURE:
      return {
        ...state,
        data: [],
        books: [],
        loading: false,
        error: action.error
      }
    case SEARCH_BOOKS:
      return {
        ...state,
        data: action.data,
        books: [],
        loading: true,
        error: []
      }
    case SEARCH_BOOKS_SUCCESS:
      return {
        ...state,
        data: [],
        books: action.books,
        loading: false,
        error: []
      }
    case SEARCH_BOOKS_FAILURE:
      return {
        ...state,
        data: [],
        books: [],
        loading: false,
        error: action.error
      }
    case REMOVE_BOOK:
      return {
        ...state,
        data: action.data,
        books: state.books,
        loading: true,
        error: []
      }
    case REMOVE_BOOK_SUCCESS:
      return {
        ...state,
        data: [],
        books: [...(state.books.filter(item => (item._id !== action.data._id)))],
        loading: false,
        error: []
      }
    case REMOVE_BOOK_FAILURE:
      return {
        ...state,
        data: [],
        books: [],
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}
