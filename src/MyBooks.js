import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

const shelfCategories = [
  'currentlyReading',
  'wantToRead',
  'read'
]

class MyBooksPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    userBookChange: PropTypes.func.isRequired
  }

  render() {
    const books = this.props.books

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfCategories.map(category => (
              (books.filter(b => b.shelf === category) && (
                <BookShelf
                  key={category}
                  books={books.filter(b => b.shelf === category)}
                  userBookChange={this.props.userBookChange}
                  title={category}/>
              ))
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooksPage