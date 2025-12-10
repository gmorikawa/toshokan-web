import type { BinaryFile } from "../../../types/binary-file";
import type { Document } from "./document";
import type { File } from "../../file/types/file";

export interface DocumentFile {
    id: string;
    document: Document;
    file: File | null;
    version: string;
    description?: string;
    publishingYear?: number;
}

export interface NewDocumentFile {
    document: Document;
    file: File | null;
    version: string;
    description?: string;
    publishingYear?: number | null;

    binary: BinaryFile | null;
}