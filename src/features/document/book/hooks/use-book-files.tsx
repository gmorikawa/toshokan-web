import { useEffect, useState } from "react";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import useAlert from "@/components/feedback/use-alert";
import type { DocumentFile } from "@/types/models/document-file";
import type { Book } from "@/types/models/book";

export interface UseBookFilesResult {
    files: DocumentFile[];
}

export function useBookFiles(book: Book | null) {
    const service = useService<BookService>(BookService, { includeAuthorization: true });
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