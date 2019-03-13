import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/auth/signup", { user }).then(res => res.data.user),
    confirm: token =>
      axios.post("/api/auth/confirmation", { token }).then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }).then(res => res.data.user),
    validateToken: token =>
      axios.post("/api/auth/validate_token", { token }).then(res => res.data.user),
    resetPassword: data =>
      axios.post("/api/auth/reset_password", { data }).then(res => res.data.user)
  },
  books: {
    fetchBooks: () =>
      axios.get("/api/books").then(res => res.data.books),
    createBook: book =>
      axios.post("/api/books", { book }).then(res => res.data.book),
    searchBooks: query =>
      axios.get("/api/books/search", { params: { q: query } }).then(res => res.data.books),
    removeBook: book =>
      axios.delete("/api/books", { params: { bookId: book }}).then(res => res.data.book),
  }
};
