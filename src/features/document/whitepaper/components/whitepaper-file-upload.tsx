import { useEffect, useState } from "react";
import type { Whitepaper } from "@/entities/models/whitepaper";
import type { DocumentFile, NewDocumentFile } from "@/entities/models/document-file";

import useAlert from "@/hooks/feedback/use-alert";
import useModal from "@/components/modal/use-modal";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import StackContainer from "@/components/container/stack-container";

import DocumentFileCard from "@/features/document/components/document-file-card";
import UploadModal from "@/features/document/components/upload-modal";

export interface WhitepaperFileUploadProps {
    whitepaper: Whitepaper;
}

export function WhitepaperFileUpload({ whitepaper }: WhitepaperFileUploadProps) {
    const alert = useAlert();
    const modal = useModal({
        title: "Upload New File",
        triggerLabel: "Upload File"
    });
    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });
    const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>([]);

    function handleUpload(documentFile: NewDocumentFile): void {
        service.upload(whitepaper, documentFile)
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
        service.download(whitepaper, documentFile)
            .then((blob: Blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = documentFile.file?.filename || whitepaper.title;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    function handleRemove(documentFile: DocumentFile): void {
        service.removeFile(whitepaper, documentFile)
            .then(() => {
                alert.showMessage("File removed successfully.", "success");
                loadFiles();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    function loadFiles(): void {
        service.getFiles(whitepaper)
            .then((files: DocumentFile[]) => {
                setDocumentFiles(files);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        (whitepaper.id) && (loadFiles());
    }, [whitepaper]);
    return (
        <StackContainer spacing={4}>
            <UploadModal
                controller={modal}
                document={whitepaper}
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

export default WhitepaperFileUpload;
