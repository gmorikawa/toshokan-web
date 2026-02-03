import { Environment } from "@/config/environment";

import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { Book, NewBook } from "@features/book/types/book";
import type { BookFilter, BookQueryOptions } from "@features/book/types/query";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";

export async function getAllBooks(
    session: Session,
    query?: BookQueryOptions
): Promise<Book[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("books");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL<BookFilter>(url, query?.filters);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllBooks(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/books/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getBookById(session: Session, id: string): Promise<Book> {
    const url = new URL(`${Environment.API_URL}/books/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createBook(session: Session, book: NewBook): Promise<Book> {
    const url = new URL(`${Environment.API_URL}/books`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(book)
    });

    return response.json();
}

export async function updateBook(session: Session, id: string, book: Book): Promise<Book> {
    const url = new URL(`${Environment.API_URL}/books/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(book)
    });

    return response.json();
}

export async function deleteBook(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/books/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}

export async function getBookFiles(session: Session, bookId: string): Promise<DocumentFile[]> {
    const url = new URL(`${Environment.API_URL}/books/${bookId}/files`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getBookFile(session: Session, bookId: string, documentFileId: string): Promise<DocumentFile> {
    const url = new URL(`${Environment.API_URL}/books/${bookId}/files/${documentFileId}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function downloadBookFile(session: Session, bookId: string, fileId: string): Promise<Blob> {
    const url = new URL(`${Environment.API_URL}/books/${bookId}/files/${fileId}/download`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.blob();
}

export async function uploadBookFile(session: Session, bookId: string, documentFile: NewDocumentFile): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/books/${bookId}/files/upload`);
    const formData = new FormData();
    Object.entries(documentFile).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${session.token}`
        },
        body: formData
    });

    return response.ok;
}

export async function deleteBookFile(session: Session, bookId: string, fileId: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/books/${bookId}/files/${fileId}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
