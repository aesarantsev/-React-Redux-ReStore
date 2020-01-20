import React, { Component } from "react";
import { connect } from "react-redux";

import "./book-list.css";

import BookListItem from "../book-list-item";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import { fetchBooks, booksAddedToCart } from "../../actions";
import { withBookstoreService } from "../hoc";

import compose from "../../utils";

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {books.map(item => {
        return (
          <li key={item.id}>
            <BookListItem
              book={item}
              onAddedToCart={() => onAddedToCart(item.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return {
    books,
    loading,
    error
  };
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: id => dispatch(booksAddedToCart(id))
  };
};

export default withBookstoreService(
  connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
);
