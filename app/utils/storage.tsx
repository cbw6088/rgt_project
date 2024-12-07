import { books as mockBooks } from "@/app/mock_data/books";
import { Book } from "./book";

// 로컬스토리지에서 데이터 로드
export const loadBooks = (): Book[] => {
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
};

// 로컬스토리지에 데이터 저장
export const saveBooks = (books: Book[]) => {
    localStorage.setItem("books", JSON.stringify(books));
};

// 로컬스토리지 초기화 (초기 목업 데이터 설정)
export const initializeBooks = () => {
    const storedBooks = localStorage.getItem("books");
    if (!storedBooks) {
        localStorage.setItem("books", JSON.stringify(mockBooks));
    }
};
