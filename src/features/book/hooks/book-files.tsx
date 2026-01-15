import { useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { DocumentFile } from "@features/document/types/document-file";
import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";

import { useAlert } from "@components/feedback/alert/controller";

export interface UseBookFilesResult {
    files: DocumentFile[];
}

export function useBookFiles(book: Nullable<Book>) {
    const service = useBookService();
    const alert = useAlert();

    const [files, setFiles] = useState<DocumentFile[]>([]);

    useEffect(() => {
        if (book) {
            service.getFiles(book)
                .then((response: DocumentFile[]) => {
                    setFiles(response);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    }, [book]);

    return {
        files
    };
}

export default useBookFiles;