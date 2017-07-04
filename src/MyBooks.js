import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class MyBooksPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    userBookChange: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

  render() {
    const { books, categories } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {categories.map(category => (
              (books.filter(b => b.shelf === category) && (
                <BookShelf
                  key={category}
                  categories={categories}
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