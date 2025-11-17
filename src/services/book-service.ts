import type { NewBook, Book } from "@/entities/models/book";
import type { DocumentFile, NewDocumentFile } from "@/entities/models/document-file";
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

    async getFiles(book: Book): Promise<DocumentFile[]> {
        return this.http.get<DocumentFile[]>(`/api/books/${book.id}/files`);
    }

    async download(book: Book, documentFile: DocumentFile): Promise<Blob> {
        return this.http.get<Blob>(`/api/books/${book.id}/files/${documentFile.id}/download`);
    }

    async upload(book: Book, documentFile: NewDocumentFile): Promise<void> {
        const body = documentFile;

        return this.http.post<void>(`/api/books/${book.id}/files/upload`, { body, contentType: "form-data" });
    }

    async removeFile(book: Book, documentFile: DocumentFile): Promise<void> {
        return this.http.delete<void>(`/api/books/${book.id}/files/${documentFile.id}`);
    }
}

export default BookService;
