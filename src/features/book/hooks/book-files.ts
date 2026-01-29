import { useCallback, useEffect, useState } from "react";

import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import { useAlert } from "@components/feedback/alert/controller";

import type { DocumentFile } from "@features/document/types/document-file";
import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";

export interface BookFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useBookFiles(book: Book | ID): BookFilesController {
    const service = useBookService();
    const alert = useAlert();

    const [data, setData] = useState<DocumentFile[]>([]);

    const reload = async () => {
        if (getID(book)) {
            setData([]);
            return;
        }

        return service.getFiles(book)
            .then((response: DocumentFile[]) => {
                setData(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handleDownload = useCallback((documentFile: DocumentFile) => {
        if (!book) {
            return;
        }

        service.download(book, documentFile)
            .then((blob: Blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = documentFile.file?.filename || getID(book);
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [book]);

    const handleRemove = useCallback((documentFile: DocumentFile) => {
        if (!book) {
            return;
        }

        service.removeFile(book, documentFile)
            .then(() => {
                alert.showMessage("File removed successfully.", "success");
                reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [book]);

    useEffect(() => {
        reload();
    }, [book]);

    return {
        data,
        reload,
        handleDownload,
        handleRemove
    };
}

export default useBookFiles;