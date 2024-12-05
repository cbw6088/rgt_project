import React from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
}

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="flex flex-col items-center border p-4 rounded-md shadow-md w-full">
            <div className="w-[210px] h-[297px] bg-gray-200 mb-2 rounded-md" />
            <h3 className="font-bold">{book.title}</h3>
            <p>저자: {book.author}</p>
            <p>가격: {book.price} 원</p>
        </div>
    );
};

export default BookItem;