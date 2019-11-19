import React, { Component } from "react";
import { connect } from "react-redux";

import "./book-list.css";

import BookListItem from "../book-list-item";
import { withBookstoreService } from "../hoc";
import { booksLoaded } from "../../actions";
import compose from "../../utils";

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();

    this.props.booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul>
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
//Значение - название соответствующего ключа в глобальном стейте
const mapStateToProps = state => {
  return {
    books: state.books
  };
};

//Возвращает свойство компонента booksLoaded, которое диспатчит новый экшн
const mapDispatchToProps = { booksLoaded };

export default withBookstoreService(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
