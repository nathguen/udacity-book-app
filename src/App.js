import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import MyBooksPage from './MyBooks'
import createHistory from 'history/createBrowserHistory'

const shelfCategories = [
  'currentlyReading',
  'wantToRead',
  'read'
]

const history = createHistory()

class BooksApp extends React.Component {
  state = {
    books: [],
    myBooks: [],
    query: '',
    searchResults: []
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data,
        myBooks: data.filter((b) => b.shelf)
      })
    })
  }

  componentDidMount() {
    this.fetchBooks()
    this.updateQuery()
  }

  handleUserBookChange = (book) => {
    BooksAPI.update(book, book.shelf).then((data) => {
      const books = this.state.books.filter((b) => b.id !== book.id ).concat([book])
      this.setState({
        books
      })
      this.fetchBooks()
    })
  }

  listen = history.listen((location, action) => {
    this.updateQuery()
  })

  updateQuery = () => {
    const query = history.location.pathname.substring('/search/'.length)
    this.setState({ query })
    this.getSearchResults(query)
  }

  updateUrl = (query) => {
    history.push('/search/' + query)
  }

  getSearchResults = (query) => {
    BooksAPI.search(query).then((searchResults) => {
      if(!searchResults || !searchResults.length) {
        searchResults = []
      }
      this.setState({ searchResults })
    })
  }

  render() {
    const { myBooks, query, searchResults } = this.state

    return (
      <div className="app">
        <Route exact path="/search/:query" render={() => (
          <SearchPage
            query={query}
            updateQuery={this.updateUrl}
            searchResults={searchResults}
            categories={shelfCategories}
            userBookChange={(book) => this.handleUserBookChange(book)} />
        )}/>
        <Route exact path="/" render={() => (
          <MyBooksPage
            books={myBooks}
            query={query}
            categories={shelfCategories}
            userBookChange={(book) => this.handleUserBookChange(book)} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
