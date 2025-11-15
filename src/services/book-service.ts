import type { NewBook, Book } from "@/entities/models/book";
import MainService, { type Service } from "@/services";

export class BookService extends MainService implements Service {
    async getAll(): Promise<Book[]> {
        return this.http.get<Book[]>("/api/books");
    }

    async getById(id: string): Promise<Book> {
        return this.http.get<Book>(`/api/books/${id}`);
    }

    async create(book: NewBook): Promise<Book> {
        const body = book;
        return this.http.post<Book>("/api/books", { body });
    }

    async update(book: Book): Promise<Book> {
        const body = book;
        return this.http.patch<Book>(`/api/books/${book.id}`, { body });
    }

    async remove(book: Book): Promise<void> {
        return this.http.delete<void>(`/api/books/${book.id}`);
    }
}

export default BookService;
