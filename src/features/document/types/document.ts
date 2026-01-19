import type { ID } from "@shared/entity/types/id";
import type { Nullable } from "@shared/object/types/nullable";

import type { Author } from "@features/author/types/author";
import type { DocumentFile } from "@features/document/types/document-file";
import type { Language } from "@features/language/types/language";
import type { Topic } from "@features/topic/types/topic";

export interface Document {
    id: ID;
    title: string;
    summary: string;
    language: Nullable<Language>;
    authors: Author[];
    topics: Topic[];
    publishingYear: Nullable<number>;

    documentFiles: DocumentFile[];
}

export interface NewDocument {
    title: string;
    summary: string;
    language: Nullable<Language>;
    authors: string[];
    topics: string[];
    publishingYear: Nullable<number>;
}
