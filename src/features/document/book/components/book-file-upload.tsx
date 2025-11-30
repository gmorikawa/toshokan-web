import { useEffect, useState } from "react";
import type { DocumentFile, NewDocumentFile } from "@/types/models/document-file";
import type { Book } from "@/types/models/book";

import useAlert from "@/components/feedback/use-alert";
import useModal from "@/components/modal/use-modal";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import StackContainer from "@/components/container/stack-container";

import DocumentFileCard from "@/features/document/components/document-file-card";
import UploadModal from "@/features/document/components/upload-modal";

export interface BookFileUploadProps {
    book: Book;
}

export function BookFileUpload({ book }: BookFileUploadProps) {
    const alert = useAlert();
    const modal = useModal({
        title: "Upload New File",
        triggerLabel: "Upload File"
    });
    const service = useService<BookService>(BookService, { includeAuthorization: true });
    const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>([]);

    function handleUpload(documentFile: NewDocumentFile): void {
        service.upload(book, documentFile)
            .then(() => {
                modal.close();
                alert.showMessage("File uploaded successfully.", "success");
                loadFiles();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            })
    }

    function handleDownload(documentFile: DocumentFile): void {
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
    }

    function handleRemove(documentFile: DocumentFile): void {
        service.removeFile(book, documentFile)
            .then(() => {
                alert.showMessage("File removed successfully.", "success");
                loadFiles();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    function loadFiles(): void {
        service.getFiles(book)
            .then((files: DocumentFile[]) => {
                setDocumentFiles(files);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        (book.id) && (loadFiles());
    }, [book]);
    return (
        <StackContainer spacing={4}>
            <UploadModal
                controller={modal}
                document={book}
                onUpload={handleUpload}
            />

            {documentFiles?.map((documentFile: DocumentFile) => (
                <DocumentFileCard
                    key={documentFile.id}
                    documentFile={documentFile}
                    onDownload={handleDownload}
                    onRemove={handleRemove}
                />
            ))}
        </StackContainer>
    );
}

export default BookFileUpload;
