import type { Author } from "./author";
import type { DocumentFile } from "./document-file";
import type { Language } from "./language";
import type { Topic } from "./topic";

export interface Document {
    id: string;
    title: string;
    summary: string;
    language: Language | null;
    authors: Author[];
    topics: Topic[];

    documentFiles: DocumentFile[];
}

export interface NewDocument {
    title: string;
    summary: string;
    language: Language | null;
    authors: string[];
    topics: string[];
}