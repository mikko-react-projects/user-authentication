import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import AddBook from '../cards/AddBook';
import BookGrid from '../grids/BookGrid';
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { fetchBooks, removeBook } from "../../actions/books";

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  removeBook = book => {
    this.props.removeBook(book._id);
  }

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ?
          <AddBook /> :
          <BookGrid
            books={books}
            removeBook={this.removeBook}
          />
        }
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  books: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  }).isRequired,
};

function mapStateToProps(state){
	return{
    isConfirmed: !!state.auth.data.confirmed,
    books: state.books.books
  }
}

export default connect(mapStateToProps, { fetchBooks, removeBook })(DashboardPage);
