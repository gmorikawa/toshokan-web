import type { Book } from "@features/book/types/book";

export function buildBookFullTitle(book: Book): string {
    const hasSubtitle = Boolean(book.subtitle && book.subtitle.length > 0);

    if (hasSubtitle) {
        return `${book.title}: ${book.subtitle}`;
    }

    return book.title;
}