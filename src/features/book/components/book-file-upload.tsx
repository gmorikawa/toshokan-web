import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import type { Book } from "@features/book/types/book";
import { useBookService } from "@features/book/hooks/book-service";
import { useBookFiles } from "@features/book/hooks/book-files";
import { DocumentFileCard } from "@features/document/components/document-file-card";
import { UploadModal } from "@features/document/components/upload-modal";

import { useAlert } from "@components/feedback/alert/controller";
import { useModal } from "@components/modal/use-modal";
import { StackContainer } from "@components/container/stack-container";

export interface BookFileUploadProps {
    book: Book;
}

export function BookFileUpload({ book }: BookFileUploadProps) {
    const alert = useAlert();
    const modal = useModal({
        title: "Upload New File",
        triggerLabel: "Upload File"
    });
    const service = useBookService();
    const files = useBookFiles(book);

    function handleUpload(documentFile: NewDocumentFile): void {
        service.upload(book, documentFile)
            .then(() => {
                modal.close();
                alert.showMessage("File uploaded successfully.", "success");
                files.reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            })
    }

    return (
        <StackContainer spacing={4}>
            <UploadModal
                controller={modal}
                document={book}
                onUpload={handleUpload}
            />

            {files.data?.map((documentFile: DocumentFile) => (
                <DocumentFileCard
                    key={documentFile.id}
                    documentFile={documentFile}
                    onDownload={files.handleDownload}
                    onRemove={files.handleRemove}
                />
            ))}
        </StackContainer>
    );
}

export default BookFileUpload;
