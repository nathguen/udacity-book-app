import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as ChangeCase from 'change-case'
import sortBy from 'sort-by'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    userBookChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
  }

  render() {
    let books = this.props.books
    const categories = this.props.categories
    books.sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ChangeCase.title(this.props.title)}</h2>
        <div className="bookshelf-books">
          { books.length === 0 && (
            <p>No books to show</p>
          )}

          { books.length > 0 && (
            <ol className="books-grid">
              { books.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelfCategories={categories}
                    userBookChange={this.props.userBookChange}/>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default BookShelf