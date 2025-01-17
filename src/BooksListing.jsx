import React from 'react';
import { Link } from 'react-router-dom';

function BooksListing({ children }) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    { children }
                </div>
            </div>
            <div className="open-search">
                <Link to='/search' >Add a book</Link>
            </div>
        </div>
    );
}

export default BooksListing;