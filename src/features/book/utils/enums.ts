import type { BookType } from "@features/book/types/book";

export interface BookTypeMetadata {
    type: BookType;
    label: string;
}

export class BookTypeUtil {
    static getMetadata(): BookTypeMetadata[] {
        return [
            { type: "FICTION", label: "Fiction" },
            { type: "NON_FICTION", label: "Non-fiction" },
        ];
    }

    static getAll(): BookType[] {
        return BookTypeUtil.getMetadata().map((meta) => meta.type);
    }

    static getNameByType(type: BookType): string {
        return BookTypeUtil.getMetadata().find((meta) => meta.type === type)?.label || "Unknown";
    }
}

export default BookTypeUtil;