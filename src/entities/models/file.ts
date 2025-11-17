export type FileState = "UPLOADING" | "AVAILABLE" | "CORRUPTED";

export interface FileType {
    id: string;
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