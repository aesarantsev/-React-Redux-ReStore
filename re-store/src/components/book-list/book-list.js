import React, { Component } from "react";
import { connect } from "react-redux";

import "./book-list.css";

import BookListItem from "../book-list-item";
import Spinner from "../spinner";
import { withBookstoreService } from "../hoc";
import { booksLoaded } from "../../actions";
import compose from "../../utils";

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, booksLoaded } = this.props;
    bookstoreService.getBooks().then(data => booksLoaded(data));
  }

  render() {
    const { books, loading } = this.props;

    if (loading) {
      return <Spinner />;
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
const mapStateToProps = ({ books, loading }) => {
  return {
    books,
    loading
  };
};

//Возвращает свойство компонента booksLoaded, которое диспатчит новый экшн
//Для диспатча экшена booksLoaded
const mapDispatchToProps = { booksLoaded };

export default withBookstoreService(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
