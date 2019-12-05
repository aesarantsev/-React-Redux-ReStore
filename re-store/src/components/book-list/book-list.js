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
    booksRequested();
    bookstoreService
      .getBooks()
      .then(data => booksLoaded(data))
      .catch(err => booksError(err));
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

//Ключ - название prop в компоненте.
//Значение - название соответствующего ключа в store
//Для получения books из store
const mapStateToProps = ({ books, loading, error }) => {
  return {
    books,
    loading,
    error
  };
};

//Возвращает свойство компонента booksLoaded, которое диспатчит новый экшн
//Для диспатча экшена booksLoaded
const mapDispatchToProps = { booksLoaded, booksRequested, booksError };

export default withBookstoreService(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
