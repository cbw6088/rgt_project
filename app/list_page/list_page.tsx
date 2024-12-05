"use client"

import { useState, useEffect } from "react";
import { getBooks, debounceSearch } from "./actions/get_books";
import { books } from "../mock_data/books";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function listPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState("title");

    useEffect(() => {
        const fetchBooks = async() => {
            const data = await getBooks(page, searchQuery);
            setFilteredBooks(data.books);
            setTotal(data.total);
        };
        fetchBooks();
    },[page, searchQuery]);

    // 검색어 입력
    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debounceSearch(query, setFilteredBooks, books)
    }

    // 검색 카테고리
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }

    const totalPages = Math.ceil(total / 10);

    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="w-full h-18 flex bg-stone-100">
                <div className="w-full flex justify-between items-center  my-4">
                    <div className="ml-4 font-black text-xl text-gray-800">
                        RGT BOOKSTORE
                    </div>
                    <div className="flex justify-center w-[70%]">
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="p-2 h-10 rounded-l-md bg-stone-50 border"
                        >
                            <option value="title">제목</option>
                            <option value="author">저자</option>
                        </select>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search ..."
                            className="p-2 w-[60%] h-10 rounded-r-md bg-stone-50 border"
                        />
                    </div>
                    <div className="mr-4">
                        <i className="fas fa-bars"></i>
                    </div>
                </div>

            </div>
        </div>
    );
}
