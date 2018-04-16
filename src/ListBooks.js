import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book.js'

class ListBooks extends Component {
  render() {

    const currentlyReading = this.props.books.filter((book) => (book.shelf === 'currentlyReading'))
    const wantToRead = this.props.books.filter((book) => (book.shelf === 'wantToRead'))
    const read = this.props.books.filter((book) => (book.shelf === 'read'))
    const { onBookUpdate } = this.props;

    return (<div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    currentlyReading.map((book) => (<li key={book.id}>
                      <Book bookData={book} onBookUpdate={onBookUpdate} />
                    </li>))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    wantToRead.map((book) => (<li key={book.id}>
                      <Book bookData={book} onBookUpdate={onBookUpdate} />
                    </li>))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    read.map((book) => (<li key={book.id}>
                      <Book onBookUpdate={onBookUpdate} bookData={book} />
                    </li>))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"></Link>
        </div>
      </div>
    </div>);
  }
}

export default ListBooks;
