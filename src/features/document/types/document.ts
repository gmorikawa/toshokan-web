import type { Author } from "../../author/types/author";
import type { DocumentFile } from "./document-file";
import type { Language } from "../../language/types/language";
import type { Topic } from "../../topic/types/topic";

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