import type { Category } from "./category";
import type { Document, NewDocument } from "./document";
import type { Publisher } from "./publisher";

export type BookType = "FICTION" | "NON_FICTION";

export interface Book extends Document {
    category: Category | null;
    publisher: Publisher | null;
    type: BookType;
}

export interface NewBook extends NewDocument {
    category: Category | null;
    publisher: Publisher | null;
    type: BookType;
}