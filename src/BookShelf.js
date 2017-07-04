import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as ChangeCase from 'change-case'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    userBookChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  humanReadableTitle = (title) => {
    return ChangeCase.title(title)
  }

  render() {
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.humanReadableTitle(this.props.title)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  userBookChange={this.props.userBookChange}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf