"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { books as initialBooks } from "@/app/mock_data/books";
import { loadBooks, saveBooks, initializeBooks } from "../utils/storage";

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    rating: number;
    total: number;
    stock: number;
}

const ManageBooks: React.FC = () => {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]); // 책 상태 관리
    const [newBook, setNewBook] = useState<Book>({
        id: 0,
        title: "",
        author: "",
        price: 0,
        description: "",
        rating: 0,
        total: 0,
        stock: 0,
    });

    useEffect(() => {
        initializeBooks(); // 로컬스토리지를 초기화
        const storedBooks = loadBooks();
        setBooks(storedBooks); // 초기 데이터 로드
    }, []);

    const addBook = () => {
        if (!newBook.title || !newBook.author) {
            alert("제목과 저자를 입력하세요.");
            return;
        }
        // books 배열에서 가장 큰 id 값을 찾고, 그 다음 id로 설정
        const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);
        const newBookWithId = { ...newBook, id: maxId + 1 }; // 가장 큰 id + 1
        const updatedBooks = [...books, newBookWithId];
    
        setBooks(updatedBooks);
        saveBooks(updatedBooks); // 로컬스토리지에 저장
        setNewBook({ id: 0, title: "", author: "", price: 0, description: "", rating: 0, total: 0, stock: 0 });
    };
    
    
    const removeBook = (id: number) => {
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
        saveBooks(updatedBooks); // 로컬스토리지 저장
    };

    const updateStock = (id: number, change: number) => {
        const updatedBooks = books.map(book =>
            book.id === id ? { ...book, stock: Math.max(book.stock + change, 0) } : book
        );
        setBooks(updatedBooks);
        saveBooks(updatedBooks); // 로컬스토리지 저장
    };

    return (
        <div>
            <div className="w-full h-18 flex bg-stone-100">
                <div className="w-full flex justify-between items-center my-4">
                    <div 
                        className="ml-4 font-black text-xl text-gray-800"
                        onClick={() => router.push("/list_page")}
                    >
                        RGT BOOKSTORE
                    </div>
                    <button
                        className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        onClick={() => router.push("/manager_page")}
                    >
                        관리
                    </button>
                </div>
            </div>

            {/* 책 추가 폼 */}
            <div className="mb-6 p-4 border rounded-md shadow-md m-4">
                <h2 className="text-xl font-semibold mb-3">책 추가</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">제목</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="제목" 
                            value={newBook.title} 
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">저자</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="저자" 
                            value={newBook.author} 
                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">가격</label>
                        <input 
                            type="number" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="가격" 
                            value={newBook.price} 
                            onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">재고</label>
                        <input 
                            type="number" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="재고" 
                            value={newBook.stock} 
                            onChange={(e) => setNewBook({ ...newBook, stock: Number(e.target.value) })} 
                        />
                    </div>
                </div>
                <button 
                    onClick={addBook} 
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    추가
                </button>
            </div>

            {/* 책 목록 */}
            <table className="w-full border-collapse border m-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">제목</th>
                        <th className="border p-2">저자</th>
                        <th className="border p-2">가격</th>
                        <th className="border p-2">재고</th>
                        <th className="border p-2">관리</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id} className="text-center">
                            <td className="border p-2">{book.id}</td>
                            <td className="border p-2">{book.title}</td>
                            <td className="border p-2">{book.author}</td>
                            <td className="border p-2">{book.price} 원</td>
                            <td className="border p-2">{book.stock}</td>
                            <td className="border p-2">
                                <button 
                                    onClick={() => updateStock(book.id, 1)} 
                                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                                >
                                    +
                                </button>
                                <button 
                                    onClick={() => updateStock(book.id, -1)} 
                                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                                >
                                    -
                                </button>
                                <button 
                                    onClick={() => removeBook(book.id)} 
                                    className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBooks;
