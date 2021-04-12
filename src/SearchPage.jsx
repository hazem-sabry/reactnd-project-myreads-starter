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
        books: []
    }

    updateQuery = (query) => {
        if (!query) {
            this.setState({query: '', books: []})
            return;
        }
        this.setState({ query: query.trim() })
        try {
            BooksAPI.search(query).then((books) => {
                this.setState(() => ({ 
                    books,
                }))
            })
        } catch (error) {
            this.setState( () => (
                { books: [] }
            ));
            console.error(error);
        }
    }
    render() {
        const { books, query } = this.state;
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
                    { !!books.length && <ol className="books-grid">
                        { books.map(book => (
                            <Book book={book} onUpdateBookStatus={onUpdateBookStatus} key={book.id} />
                        ))}
                    </ol> }
                    { !books.length && <p>Search for new books to add to your reading list</p> }
                </div>
            </div>
        )
    }
}

export default SearchPage;