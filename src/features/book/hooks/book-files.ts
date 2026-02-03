import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import { useAlert } from "@components/feedback/alert/controller";

import type { DocumentFile } from "@features/document/types/document-file";
import type { Book } from "@features/book/types/book";
import { useDocumentFiles } from "@features/document/hooks/document-files";
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

    return useDocumentFiles<Book>({
        document: book,
        fetchFiles: async () => {
            const id = getID(book);

            if (id === undefined || id === null || id === "") {
                return [];
            }

            return service.getFiles(book);
        },
        download: async (documentFile: DocumentFile) => {
            return service.download(book, documentFile)
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return null;
                });
        },
        remove: async (documentFile: DocumentFile) => {
            return service.removeFile(book, documentFile)
                .then(() => {
                    alert.showMessage("File removed successfully.", "success");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        },
    });
}
