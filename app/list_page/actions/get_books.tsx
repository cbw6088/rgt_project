import { books } from "@/app/mock_data/books";

export const getBooks = async (page: number, searchQuery: string = "", category: string = "title") => {
    const limite = 10;
    const startIndex = (page - 1) * limite;
    const endIndex = page * limite;

    // 검색어 필터링
    const filteredBooks = books.filter((book) => {
        if (category === "title") {
            return book.title.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (category === "author") {
            return book.author.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    // 페이지네이션
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return {
        books: paginatedBooks,
        total: filteredBooks.length,
        currentPage: page,
    }
}