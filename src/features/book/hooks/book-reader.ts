import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import type { Book } from "@features/book/types/book";
import type { DocumentFile } from "@features/document/types/document-file";
import type { DocumentReaderController } from "@features/document/hooks/document-reader";
import { useBookService } from "@features/book/hooks/book-service";
import { useDocumentReader } from "@features/document/hooks/document-reader";

export interface BookReaderController extends DocumentReaderController { }

export function useBookReader(
    book: Book | ID,
    documentFile: DocumentFile | ID
): BookReaderController {
    const service = useBookService();

    return useDocumentReader(
        () => service.download(book, documentFile),
        () => service.getFile(book, getID(documentFile)),
    );
}
