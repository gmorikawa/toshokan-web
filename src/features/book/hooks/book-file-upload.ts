import type { Book } from "@features/book/types/book";
import type { NewDocumentFile } from "@features/document/types/document-file";
import type { DocumentFileUploadController } from "@features/document/hooks/document-file-upload";
import { useBookService } from "@features/book/hooks/book-service";
import { useDocumentFileUpload } from "@features/document/hooks/document-file-upload";

export interface BookFileUploadController extends DocumentFileUploadController<Book> { }

export function useBookFileUpload() {
    const service = useBookService();

    return useDocumentFileUpload<Book>(
        async (book: Book, newDocumentFile: NewDocumentFile) => {
            await service.upload(book, newDocumentFile);
        }
    );
}
