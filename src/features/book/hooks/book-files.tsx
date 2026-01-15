import { useCallback, useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { DocumentFile } from "@features/document/types/document-file";
import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";

import { useAlert } from "@components/feedback/alert/controller";

export interface BookFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useBookFiles(book: Nullable<Book>): BookFilesController {
    const service = useBookService();
    const alert = useAlert();

    const [data, setData] = useState<DocumentFile[]>([]);

    const reload = async () => {
        if (!book?.id) {
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
                a.download = documentFile.file?.filename || book.title;
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