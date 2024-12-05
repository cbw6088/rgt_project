"use client"

import { useState, useEffect } from "react";
import { getBooks, debounceSearch } from "./actions/get_books";
import { books } from "../mock_data/books";

export default function listPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchBooks = async() => {
            const data = await getBooks(page, searchQuery);
            setFilteredBooks(data.books);
            setTotal(data.total);
        };
        fetchBooks();
    },[page]);

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debounceSearch(query, setFilteredBooks, books)
    }

    const totalPages = Math.ceil(total / 10);

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[40%] flex justify-center bg-stone-100">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search ..."
                    className="border p-2 my-4 w-[60%] h-10 rounded-md"
                />

            </div>
        </div>
    );
}
