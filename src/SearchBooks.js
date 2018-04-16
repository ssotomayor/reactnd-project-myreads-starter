import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input';
import {Link} from 'react-router-dom'
import Book from './Book.js'
import { ScaleLoader } from 'react-spinners'
import SHELVES from './constants.js'

class SearchBooks extends Component {

  state = {
    query: '',
    resultBooks: [],
    loading: false
  }

  switchLoading = () => {
    this.setState((currentState) => {
      currentState.loading = !currentState.loading
      return currentState
    })
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    }, this.doSearch)
  }

  doSearch = () => {
    this.switchLoading()
    if (this.state.query === '' || this.state.query === undefined) {
      this.setState({resultBooks: []});
      return;
    }

    BooksAPI.search(this.state.query).then((results) => {
      this.setState({resultBooks: results})
      this.switchLoading()
      console.log(this.state.resultBooks);
    })
  }

  clearQuery = (query) => {
    this.setState({query: ''});
  }

  isOwned = (book) => {
    let index = this.props.booksOwned.findIndex(ownedBook => book.id === ownedBook.id)
    return index > -1 ? this.props.booksOwned[index].shelf : SHELVES.none.text
  }

  render() {

    const {onBookUpdate} = this.props;

    return (<div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */
            }
            <DebounceInput minLength={2} debounceTimeout={1000} type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => (this.updateQuery(event.target.value))}/>

          </div>
        </div>
        <div className="search-books-results">
          <div className="center">
            <ScaleLoader
              loading={this.state.loading}
              size={10}
              color="rgba(83, 99, 241, 0.57)"
            />
          </div>
          <ol className="books-grid">
            {
              !this.state.resultBooks.error && this.state.resultBooks.map((book) => (<li key={book.id}>
                <Book onBookUpdate={onBookUpdate} bookData={book} isOwned={this.isOwned(book)}/>
              </li>))
            }
          </ol>
        </div>
      </div>
    </div>);
  }
}

export default SearchBooks;
