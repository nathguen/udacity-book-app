import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as ChangeCase from 'change-case'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    userBookChange: PropTypes.func.isRequired,
    shelfCategories: PropTypes.array.isRequired
  }

  handleBookChange = (e) => {
    const book = this.props.book
    book.shelf = e.target.value
    this.props.userBookChange(book)
  }

  render() {
    const { book } = this.props
    let shelfCategories = this.props.shelfCategories
    if (shelfCategories.filter(cat => cat === 'none').length === 0) {
      shelfCategories.push('none')
    }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={ this.handleBookChange }>
              <option value="move-to" disabled>Move to...</option>
              {shelfCategories.map(cat => (
                <option key={cat} value={cat}>{ChangeCase.title(cat)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">{book.authors.join(', ')}</div>
        )}
      </div>
    )
  }
}

export default Book