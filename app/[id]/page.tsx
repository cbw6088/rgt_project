"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { books } from '@/app/mock_data/books'; 

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

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            const foundBook = books.find(b => b.id === Number(id)); 
            setBook(foundBook || null);
        }
    }, [id]);

    if (!book) return <div>Loading...</div>;

    const handlePurchase = () => {
        alert("구매할 수 없습니다.");
    };

    const handleAddToCart = () => {
        alert("장바구니에 담을 수 없습니다.");
    };

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
                    <button
                        className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        onClick={() => router.push("/manager_page")}
                    >
                        관리
                    </button>
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-row justify-center mt-10">
                    <div className="w-[210px] h-[297px] bg-gray-200 mb-2 rounded-md mr-4" />
                    <div className="flex flex-col items-start justify-center ml-4">
                        <h2 className="text-2xl font-bold">{book.title}</h2>
                        <div className="border-b-2 border-gray-50 my-2"/>
                        <p className="text-lg">저자: {book.author}</p>
                        <p className="text-lg">가격: {book.price} 원</p>
                        <p className="text-lg">평점: {book.rating} 점</p>
                        <p className="text-lg">재고: {book.stock} 개</p>
                        <p className="text-lg">{book.description}</p>
                        <div className="flex flex-row w-full mt-4">
                            <button 
                                className="flex-1 border border-gray-300 p-2 mr-2"
                                onClick={handlePurchase}
                            >
                                구매하기
                            </button>
                            <button 
                                className="flex-1 border border-gray-300 p-2"
                                onClick={handleAddToCart}
                            >
                                장바구니
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}