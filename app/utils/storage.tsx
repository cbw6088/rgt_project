import { books as mockBooks } from "@/app/mock_data/books";

// 로컬스토리지에서 데이터 로드
export const loadBooks = () => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
};

// 로컬스토리지에 데이터 저장
export const saveBooks = (books: any[]) => {
    localStorage.setItem("books", JSON.stringify(books));
};

// 로컬스토리지 초기화 (초기 목업 데이터 설정)
export const initializeBooks = () => {
    const storedBooks = localStorage.getItem("books");
    if (!storedBooks) {
        localStorage.setItem("books", JSON.stringify(mockBooks));
    }
};
