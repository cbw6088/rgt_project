import { books } from "@/app/mock_data/books";
import { debounce, filter } from "lodash";
import { start } from "repl";

export const getBooks = async (page: number, searchQuery: string = "") => {
    const limite = 10;
    const startIndex = (page - 1) * limite;
    const endIndex = page * limite;

    // 검색어 필터링
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 페이지네이션
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return {
        books: paginatedBooks,
        total: filteredBooks.length,
        currentPage: page,
    }
}

export const debounceSearch = debounce(
    (searchQuery: string, setFilteredBooks: (books: any[]) => void, books: any[]) => {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filteredBooks);
    },
    300
  );