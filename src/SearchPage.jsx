import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import Book from './Book.jsx';

class SearchPage extends Component {

    static propTypes = {
        onUpdateBookStatus: PropTypes.func.isRequired
    }

    state = {
        query: '',
        allBooks: [],
    }

    mapBooks = (searchBooks) => {
        
        if (!searchBooks.length) {
            this.setState( () => (
                {
                    query: '',
                    allBooks: [],
                }
            ));
        } else {
            const { books } = this.props;
            searchBooks.forEach(item => {
                const myBook = books.find(elem => elem.id === item.id)
                if(myBook) item.shelf = myBook.shelf
            })

            this.setState( () => (
                { allBooks: searchBooks }
            ));
        }
    }

    updateQuery = (query) => {
        if (!query) {
            this.mapBooks([]);
            return;
        }
        this.setState({ query: query.trim() })
        try {
            BooksAPI.search(query).then((books) => {
                this.mapBooks(books);
            })
        } catch (error) {
            this.mapBooks([]);
            console.error(error);
        }
    }
    render() {
        const { allBooks, query } = this.state;
        const { onUpdateBookStatus } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    { !!allBooks.length && <ol className="books-grid">
                        { allBooks.map(book => (
                            <Book book={book} onUpdateBookStatus={onUpdateBookStatus} key={book.id} />
                        ))}
                    </ol> }
                    { !allBooks.length && <p>Search for new books to add to your reading list</p> }
                </div>
            </div>
        )
    }
}

export default SearchPage;