import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Dropdown } from "semantic-ui-react";
import { searchBooks } from '../../actions/books';

class SearchBookForm extends React.Component {
  state = {
    query: "",
    loading: false,
    options: [],
    books: {}
  };

  componentWillReceiveProps(props) {
    if(typeof props.books !== 'undefined') {
      const options = [];
      const booksHash = {};
      for (const book of Object.values(props.books)) {
        booksHash[book.goodreadsId] = book;
        options.push({
          key: book.goodreadsId,
          value: book.goodreadsId,
          text: book.title
        });
      }
      this.setState({ loading: false, options, books: booksHash })
    }
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onBookSelect(this.state.books[data.value]);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    this.props.searchBooks(this.state.query.searchQuery);
  }



  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
  searchBooks: PropTypes.func.isRequired
};

function mapStateToProps(state){
	return{
    books: state.books.books
  }
}

export default connect(mapStateToProps, { searchBooks })(SearchBookForm);
