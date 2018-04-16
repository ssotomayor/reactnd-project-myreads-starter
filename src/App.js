import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import { Route } from 'react-router-dom'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { ScaleLoader } from 'react-spinners'
import SHELVES from './constants.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({books}), () => {
        console.log(this.state)
      })
    })
  }

  switchLoadingApp = () => {
    this.setState((currentState) => {
      currentState.loading = !currentState.loading
      return currentState
    })
  }

  updateBook = (book, shelf) => {
    this.switchLoadingApp()
    BooksAPI.update(book, shelf).then((result) => {
      book.shelf = shelf
      this.setState((prevState) => {
        this.switchLoadingApp()
        if (book.shelf === SHELVES.none.text) {
          return prevState.books.splice(prevState.books.findIndex((nb) => {
            return nb.id === book.id;
          }), 1)[1]
        } else {
          let index = this.state.books.findIndex(stateBook => stateBook.id === book.id)
          if (index > -1){
            prevState.books[index].shelf = shelf
          } else {
            prevState.books.push(book)
          }
          return prevState
        }
      }, () => NotificationManager.info('"' + book.title + '"' + (shelf === SHELVES.none.text ? ' removed' : ' went to ' + SHELVES[shelf].humanReadable)))
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={( () => (
          <ListBooks onBookUpdate={this.updateBook} books={this.state.books} />
        )
      )}
      />

      <Route exact path="/search" render={( () => (
        <SearchBooks onBookUpdate={this.updateBook} booksOwned={this.state.books} />
      )
    )}
    />
        <NotificationContainer/>
        <div className="loader">
          <ScaleLoader
            loading={this.state.loading}
            size={10}
            color="rgba(83, 99, 241, 0.57)"
          />
        </div>
      </div>
    )
  }
}

export default BooksApp
