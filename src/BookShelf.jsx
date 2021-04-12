import React from 'react';

function BookShelf({ children, title }) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { children }
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;