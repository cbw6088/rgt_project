import { Book } from "./book";

const BASE_URL = "/api/books"; 

// 책 목록 조회
export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// 책 상세 정보 조회
export const fetchBookById = async (id: number): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch book details");
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 책 추가
export const addBook = async (book: any): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error("Failed to add book");
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 책 정보 수정
export const updateBook = async (id: number, updatedData: any): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error("Failed to update book");
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// 책 삭제
export const deleteBook = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
