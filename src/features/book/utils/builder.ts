import type { Book } from "../types/book";

export function buildBookFullTitle(book: Book): string {
    return book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
}