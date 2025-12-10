import type { Category } from "../../../category/types/category";
import type { Document, NewDocument } from "../../types/document";
import type { Publisher } from "../../../publisher/types/publisher";

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