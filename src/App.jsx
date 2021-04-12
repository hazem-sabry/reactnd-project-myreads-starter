import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage.jsx';
import BooksListing from './BooksListing.jsx';
import BookShelf from './BookShelf.jsx';
import Book from './Book.jsx';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    try {
      BooksAPI.getAll()
        .then(books => {
          this.setBooks(books);
        })
        .catch(error => {
          throw new Error(error);
        })
    } catch(err) {
      console.error(err);
    }
  }

  setBooks = books => {
    this.setState(() => ({
      books,
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read'),
    }))
  }

  updateBookStatus = (book, shelf) => {
    try {
      BooksAPI.update(book,shelf)
        .then(() => {
          book.shelf = shelf;
          const books = this.state.books.filter(b => b.id !== book.id).concat([ book ]);
          this.setBooks(books);
        })
        .catch(error => {
          throw new Error(error);
        })
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    const { books, currentlyReading, wantToRead, read } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
              <BooksListing>
                <BookShelf title={'Currently Reading'}>
                  {currentlyReading.map(book => (
                    <Book
                      book={ book }
                      key={book.id}
                      onUpdateBookStatus={this.updateBookStatus}
                    />
                  ))}
                </BookShelf>
                <BookShelf title={'Want to Read'}>
                  {wantToRead.map(book => (
                    <Book
                      book={ book }
                      key={book.id}
                      onUpdateBookStatus={this.updateBookStatus}
                    />
                  ))}
                </BookShelf>
                <BookShelf title={'Read'}>
                  {read.map(book => (
                    <Book
                      book={ book }
                      key={book.id}
                      onUpdateBookStatus={this.updateBookStatus}
                    />
                  ))}
                </BookShelf>
              </BooksListing>
            )}
          />
          <Route path="/search" render={() => (
              <SearchPage books={books} onUpdateBookStatus={this.updateBookStatus} />
            )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
