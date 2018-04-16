import React, { Component } from 'react';
import SHELVES from './constants.js'

class Book extends Component {

  render() {

    const book = this.props.bookData
    const { onBookUpdate } = this.props;
    const changeBookShelf = (value) => {
      onBookUpdate(book, value);
    };

    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${(book.imageLinks ? book.imageLinks.thumbnail : '')}`
              }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf ? book.shelf : this.props.isOwned} onChange={(event) => {changeBookShelf(event.target.value)} }>
                <option value="none" disabled="disabled">Move to...</option>
                {Object.keys(SHELVES).map((shelf) =>
                  (<option key={SHELVES[shelf].text} value={SHELVES[shelf].text}>{SHELVES[shelf].humanReadable}</option>)
                )}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors[0] : ''}</div>
        </div>
      </div>
    );
  }

}

export default Book;
