import type { Author } from "./author";
import type { Language } from "./language";
import type { Topic } from "./topic";

export interface Document {
    id: string;
    title: string;
    summary: string;
    language: Language | null;
    authors: Author[];
    topics: Topic[];
}

export interface NewDocument {
    title: string;
    summary: string;
    language: Language | null;
    authors: string[];
    topics: string[];
}