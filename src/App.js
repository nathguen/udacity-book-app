import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import MyBooksPage from './MyBooks'

const shelfCategories = [
  'currentlyReading',
  'wantToRead',
  'read'
]

class BooksApp extends React.Component {
  state = {
    books: [],
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data,
        myBooks: data.filter((b) => b.shelf)
      })
    })
  }

  handleUserBookChange = (book) => {
    BooksAPI.update(book, book.shelf).then((data) => {
      const books = this.state.books.filter((b) => b.id !== book.id ).concat([book])
      this.setState({
        books
      })
    })
  }

  render() {
    const { books, myBooks, query } = this.state

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchPage
            books={books}
            categories={shelfCategories}
            userBookChange={(book) => this.handleUserBookChange(book)} />
        )}/>
        <Route exact path="/" render={() => (
          <MyBooksPage
            categories={shelfCategories}
            userBookChange={(book) => this.handleUserBookChange(book)} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
