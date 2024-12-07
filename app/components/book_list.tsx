import React from "react";
import BookItem from "./book_item";
import { Book } from "../utils/book";

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
    return (
        <div className="w-full flex justify-center my-8">
            <div className="grid grid-cols-5 gap-4">
                {books.map((book) => (
                    <div className="mb-4" key={book.id}>
                        <BookItem book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
