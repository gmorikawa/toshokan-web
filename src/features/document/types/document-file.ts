import type { BinaryFile } from "@shared/file/types/binary-file";
import type { Nullable } from "@shared/object/types/nullable";

import type { Document } from "@features/document/types/document";
import type { File } from "@features/file/types/file";

export interface DocumentFile {
    id: string;
    document: Document;
    file: Nullable<File>;
    description?: string;
}

export type NewDocumentFile = Omit<DocumentFile, "id" | "file"> & { binary: Nullable<BinaryFile>; };

export interface UploadDocumentFile {
    binary: BinaryFile;
    description?: string;
}