import type { Author } from "../../author/types/author";
import type { DocumentFile } from "./document-file";
import type { Language } from "../../language/types/language";
import type { Topic } from "../../topic/types/topic";
import type { Nullable } from "@shared/object/types/nullable";

export interface Document {
    id: string;
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