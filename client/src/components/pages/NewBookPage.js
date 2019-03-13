import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import SearchBookForm from "../forms/SearchBookForm";
import BookForm from "../forms/BookForm";
import { createBook } from "../../actions/books";

class NewBookPage extends React.Component {
  state = {
    book: null
  };

  onBookSelect = book => {
    this.setState({ book });
  };

  addBook = book =>
    this.props.createBook(book);

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        {this.state.book && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}

NewBookPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createBook: PropTypes.func.isRequired
};

export default connect(null, { createBook })(NewBookPage);
