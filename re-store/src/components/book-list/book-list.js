import React, { Component } from "react";
import { connect } from "react-redux";

import "./book-list.css";

import BookListItem from "../book-list-item";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import { withBookstoreService } from "../hoc";
import { booksLoaded, booksRequested, booksError } from "../../actions";
import compose from "../../utils";

class BookList extends Component {
  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError
    } = this.props;

    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }
    return (
      <ul className="book-list">
        {books.map(item => {
          return (
            <li key={item.id}>
              <BookListItem book={item} />
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return {
    books,
    loading,
    error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: () => {
      dispatch(booksRequested());

      bookstoreService
        .getBooks()
        .then(data => dispatch(booksLoaded(data)))
        .catch(err => dispatch(booksError(err)));
    }
  };
};

export default withBookstoreService(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
