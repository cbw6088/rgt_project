import React from 'react';
import BookItem from './book_item';

const BookList: React.FC<{ books: any[] }> = ({ books }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map(book => (
                <BookItem key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;