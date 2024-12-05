import React from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
}

const BookItem: React.FC< {book : Book} > = ( {book} ) => {
    return (
        <div className="border p-4 rounded-md shadow-md">
            <h3 className="font-bold">{book.title}</h3>
            <p>저자: {book.author}</p>
            <p>가격: {book.price}</p>
        </div>
    )
}

export default BookItem;