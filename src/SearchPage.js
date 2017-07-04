import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  static propTypes = {
    userBookChange: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

  state = {
    query: '',
    results: []
  }

  handleQueryChange = (query) => {
    this.setState({ query })
    BooksAPI.search(query).then((results) => {
      if(!results || !results.length) {
        results = []
      }
      this.setState({ results })
    })
  }

  render() {
    const query = this.state.query
    let results = this.state.results
    if (results) {
      results.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              value={query}
              onChange={(e) => this.handleQueryChange(e.target.value)}
              type="text"
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          { results.length === 0 && (
            <h3>No results to show..</h3>
          )}

          { results && (
            <ol className="books-grid">
              {results.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelfCategories={this.props.categories}
                    userBookChange={this.props.userBookChange} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default SearchPage