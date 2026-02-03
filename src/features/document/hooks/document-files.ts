import { useEffect, useState } from "react";

import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import type { DocumentFile } from "@features/document/types/document-file";
import type { Document } from "@features/document/types/document";

export interface DocumentFilesConfiguration<Entity extends Document> {
    document: Entity | ID;
    fetchFiles: () => Promise<DocumentFile[]>;
    download: (documentFile: DocumentFile) => Promise<Blob | null>;
    remove: (documentFile: DocumentFile) => Promise<void>;
}

export interface DocumentFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useDocumentFiles<Entity extends Document>(
    configuration: DocumentFilesConfiguration<Entity>,
): DocumentFilesController {

    const [data, setData] = useState<DocumentFile[]>([]);

    const reload = async () => {
        return configuration.fetchFiles()
            .then((response: DocumentFile[]) => {
                setData(response);
            });
    };

    const handleDownload = (documentFile: DocumentFile) => {
        configuration.download(documentFile)
            .then((blob: Blob | null) => {
                if (blob === null) {
                    return;
                }

                const blobUrl = URL.createObjectURL(blob);
                const a = window.document.createElement("a");
                a.href = blobUrl;
                a.download = documentFile.file?.filename
                    || getID(configuration.document);
                window.document.body.appendChild(a);
                a.click();
                a.remove();
            });
    };

    const handleRemove = (documentFile: DocumentFile) => {
        configuration.remove(documentFile)
            .then(() => {
                reload();
            });
    };

    useEffect(() => {
        reload();
    }, []);
    return {
        data,
        reload,
        handleDownload,
        handleRemove,
    }
}
