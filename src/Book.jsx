import React from 'react';

function Book({book, onUpdateBookStatus}) {
    book.shelf = book.shelf ? book.shelf : 'none';
    const bookThumbnailPlaceholder = require('./images/book-placeholder.png');
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : bookThumbnailPlaceholder}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e) => onUpdateBookStatus(book, e.currentTarget.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ book.title }</div>
                { book.authors && <div className="book-authors">
                    { book.authors.map((author, idx) => <p key={idx}>{ author }</p>) }
                </div>}
            </div>
        </li>
    );
}

export default Book;