import type { ID } from "@shared/entity/types/id";

export type FileState = "UPLOADING" | "AVAILABLE" | "CORRUPTED";

export interface FileType {
    id: ID;
    name: string;
    extension: string;
    mimeType: string;
}

export interface File {
    id: string;
    path: string;
    filename: string;
    type: FileType;
    state: FileState;
}