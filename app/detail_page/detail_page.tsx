"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { books } from '@/app/mock_data/books'; 
import BookItem from "../components/book_item";

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

export default function DetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            const foundBook = books.find(b => b.id === Number(id)); 
            setBook(foundBook || null);
        }
    }, [id]);

    if (!book) return <div>Loading...</div>; // 데이터 로딩 중

    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="w-full h-18 flex bg-stone-100">
                <div className="w-full flex justify-between items-center my-4">
                    <div className="ml-4 font-black text-xl text-gray-800">
                        RGT BOOKSTORE
                    </div>
                    <div className="mr-4">
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <BookItem book={book} />
            </div>
        </div>
    );
}
