import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    userBookChange: PropTypes.func.isRequired
  }

  render() {
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
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} userBookChange={this.props.userBookChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage