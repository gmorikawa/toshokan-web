import type { Document, NewDocument } from "@features/document/types/document";
import type { Category } from "@features/category/types/category";
import type { Publisher } from "@features/publisher/types/publisher";
import type { Nullable } from "@shared/object/types/nullable";

export type BookType = "FICTION" | "NON_FICTION";

export interface Book extends Document {
    subtitle: Nullable<string>;
    category: Nullable<Category>;
    publisher: Nullable<Publisher>;
    type: BookType;
    edition: string;
}

export interface NewBook extends NewDocument {
    subtitle: Nullable<string>;
    category: Nullable<Category>;
    publisher: Nullable<Publisher>;
    type: BookType;
    edition: string;
}