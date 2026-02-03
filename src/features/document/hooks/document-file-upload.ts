import { useState } from "react";

import type { BinaryFile } from "@shared/file/types/binary-file";

import type { Document } from "@features/document/types/document";
import type { NewDocumentFile, UploadDocumentFile } from "@features/document/types/document-file";

export interface DocumentFileUploadController<Entity extends Document> {
    files: UploadDocumentFile[];

    addUploadFile: (binary: BinaryFile, description?: string) => void;
    removeUploadFile: (index: number) => void;
    upload: (document: Entity) => Promise<void>;
}

export function useDocumentFileUpload<Entity extends Document>(
    uploadFunction: (document: Entity, newDocumentFile: NewDocumentFile) => Promise<void>,
): DocumentFileUploadController<Entity> {
    const [files, setFiles] = useState<UploadDocumentFile[]>([]);

    const addUploadFile = (binary: BinaryFile, description?: string): void => {
        if (files.find((file) => file.binary.name === binary.name)) return;

        setFiles((previousFiles: UploadDocumentFile[]) => [
            ...previousFiles,
            {
                binary,
                description
            }
        ]);
    };

    const removeUploadFile = (index: number): void => {
        setFiles((previousFiles: UploadDocumentFile[]) => (
            previousFiles.filter((_, fileIndex: number) => fileIndex !== index)
        ));
    };

    const upload = async (document: Entity): Promise<void> => {
        for (const uploadFile of files) {
            return uploadFunction(
                document,
                {
                    binary: uploadFile.binary,
                    document,
                    description: uploadFile.description
                }
            );
        }
    };

    return {
        files,
        addUploadFile,
        removeUploadFile,
        upload
    };
}