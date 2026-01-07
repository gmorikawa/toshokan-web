import type { Document, NewDocument } from "@features/document/types/document";
import type { Category } from "@features/category/types/category";
import type { Publisher } from "@features/publisher/types/publisher";

export type BookType = "FICTION" | "NON_FICTION";

export interface Book extends Document {
    subtitle: string | null;
    category: Category | null;
    publisher: Publisher | null;
    type: BookType;
}

export interface NewBook extends NewDocument {
    subtitle: string | null;
    category: Category | null;
    publisher: Publisher | null;
    type: BookType;
}