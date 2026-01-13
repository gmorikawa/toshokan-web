import { useSession } from "@features/auth/hooks/session";
import type { Book, NewBook } from "@features/book/types/book";
import type { BookQueryOptions } from "@features/book/types/query";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import { countAllBooks,
    createBook,
    deleteBook,
    deleteBookFile,
    downloadBookFile,
    getAllBooks,
    getBookById,
    getBookFiles,
    updateBook,
    uploadBookFile
} from "@features/book/utils/api";

export interface BookService {
    getAll(query?: BookQueryOptions): Promise<Book[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Book>;
    create(book: NewBook): Promise<Book>;
    update(book: Book): Promise<Book>;
    delete(book: Book): Promise<boolean>;
    getFiles(book: Book): Promise<DocumentFile[]>;
    download(book: Book, documentFile: DocumentFile): Promise<Blob>;
    upload(book: Book, documentFile: NewDocumentFile): Promise<boolean>;
    removeFile(book: Book, documentFile: DocumentFile): Promise<boolean>;
}

export function useBookService(): BookService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: BookQueryOptions) => getAllBooks(session, query),
        getById: async (id: string) => getBookById(session, id),
        countAll: async () => countAllBooks(session),
        create: async (book: NewBook) => createBook(session, book),
        update: async (book: Book) => updateBook(session, book.id, book),
        delete: async (book: Book) => deleteBook(session, book.id),
        getFiles: async (book: Book) => getBookFiles(session, book.id),
        download: async (book: Book, documentFile: DocumentFile) => downloadBookFile(session, book.id, documentFile.id),
        upload: async (book: Book, documentFile: NewDocumentFile) => uploadBookFile(session, book.id, documentFile),
        removeFile: async (book: Book, documentFile: DocumentFile) => deleteBookFile(session, book.id, documentFile.id)
    }
}
