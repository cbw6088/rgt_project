"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadBooks } from "../utils/storage";
import BookList from "../components/book_list";
import { Book } from "../utils/book";

export default function ListPage() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState<keyof Book>("title");
    const [page, setPage] = useState(1);
    const booksPerPage = 10;

    useEffect(() => {
        const storedBooks = loadBooks();
        setBooks(storedBooks);
        setFilteredBooks(storedBooks); // 초기 필터링 데이터 설정
        setDisplayBooks(storedBooks.slice(0, booksPerPage)); // 첫 페이지 데이터
    }, []);

    useEffect(() => {
        // 페이지 변경 시 현재 페이지 데이터 업데이트
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = page * booksPerPage;
        setDisplayBooks(filteredBooks.slice(startIndex, endIndex));
    }, [page, filteredBooks]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = books.filter((book) => {
            const field = book[category];
            if (typeof field === "string") {
                return field.toLowerCase().includes(query);
            }
            return false;
        });

        setFilteredBooks(filtered);
        setPage(1);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value as keyof Book;
        setCategory(newCategory);
        setSearchQuery("");
        setFilteredBooks(books);
        setPage(1);
    };

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="w-full h-18 flex bg-stone-100">
                <div className="w-full flex justify-between items-center my-4">
                    <div 
                        className="ml-4 font-black text-xl text-gray-800"
                        onClick={() => router.push("/list_page")}
                    >
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
                    <button
                        className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        onClick={() => router.push("/manager_page")}
                    >
                        관리
                    </button>
                </div>
            </div>

            <BookList books={displayBooks} />
            
            <div className="flex justify-center my-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setPage(index + 1)}
                        className={`mx-1 px-4 py-2 rounded-md my-8 ${page === index + 1 ? 'font-black' : 'font-normal'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
