import React from "react";
import { useReducer } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
}

const BookItem: React.FC<{ book: Book }> = ({ book }) => {

    const handleClick = () => {
        // router.push(`/book/${book.id}`);
    };

    return (
        <div className="flex flex-col items-center border p-4 rounded-md shadow-md w-full">
            <button 
                className="w-[210px] h-[297px] bg-gray-200 mb-2 rounded-md" 
                onClick={handleClick}
            />
            <button 
                className="flex justify-center font-bold text-left w-full" 
                onClick={handleClick}
            >
                {book.title}
            </button>
            <p>저자: {book.author}</p>
            <p>가격: {book.price} 원</p>
        </div>
    );
};

export default BookItem;