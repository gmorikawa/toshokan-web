import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

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
    getBookFile,
    getBookFiles,
    updateBook,
    uploadBookFile
} from "@features/book/utils/api";

export interface BookService {
    getAll(query?: BookQueryOptions): Promise<Book[]>;
    countAll(): Promise<number>;
    getById(id: ID): Promise<Book>;
    create(book: NewBook): Promise<Book>;
    update(book: Book): Promise<Book>;
    delete(book: Book | ID): Promise<boolean>;
    getFiles(book: Book | ID): Promise<DocumentFile[]>;
    getFile(book: Book | ID, documentFile: ID): Promise<DocumentFile>;
    download(book: Book | ID, documentFile: DocumentFile | ID): Promise<Blob>;
    upload(book: Book | ID, documentFile: NewDocumentFile): Promise<boolean>;
    removeFile(book: Book | ID, documentFile: DocumentFile | ID): Promise<boolean>;
}

export function useBookService(): BookService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: BookQueryOptions) => getAllBooks(session, query),
        getById: async (id: ID) => getBookById(session, id),
        countAll: async () => countAllBooks(session),
        create: async (book: NewBook) => createBook(session, book),
        update: async (book: Book) => updateBook(session, book.id, book),
        delete: async (book: Book | ID) => deleteBook(session, getID(book)),
        getFiles: async (book: Book | ID) => getBookFiles(session, getID(book)),
        getFile: async (book: Book | ID, documentFile: ID) => getBookFile(session, getID(book), getID(documentFile)),
        download: async (book: Book | ID, documentFile: DocumentFile | ID) => downloadBookFile(session, getID(book), getID(documentFile)),
        upload: async (book: Book | ID, documentFile: NewDocumentFile) => uploadBookFile(session, getID(book), documentFile),
        removeFile: async (book: Book | ID, documentFile: DocumentFile | ID) => deleteBookFile(session, getID(book), getID(documentFile))
    }
}
