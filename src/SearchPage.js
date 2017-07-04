import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import sortBy from 'sort-by'

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    userBookChange: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

  render() {
    let books = this.props.books
    books.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelfCategories={this.props.categories}
                  userBookChange={this.props.userBookChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage