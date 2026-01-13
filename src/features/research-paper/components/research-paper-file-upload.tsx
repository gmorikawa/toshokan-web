import { useEffect, useState } from "react";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { DocumentFileCard } from "@features/document/components/document-file-card";
import { UploadModal } from "@features/document/components/upload-modal";

import { useModal } from "@components/modal/use-modal";
import { useAlert } from "@components/feedback/use-alert";
import { StackContainer } from "@components/container/stack-container";

export interface ResearchPaperFileUploadProps {
    researchPaper: ResearchPaper;
}

export function ResearchPaperFileUpload({ researchPaper }: ResearchPaperFileUploadProps) {
    const alert = useAlert();
    const modal = useModal({
        title: "Upload New File",
        triggerLabel: "Upload File"
    });
    const service = useResearchPaperService();
    const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>([]);

    function handleUpload(documentFile: NewDocumentFile): void {
        service.upload(researchPaper, documentFile)
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
        service.download(researchPaper, documentFile)
            .then((blob: Blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = documentFile.file?.filename || researchPaper.title;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    function handleRemove(documentFile: DocumentFile): void {
        service.removeFile(researchPaper, documentFile)
            .then(() => {
                alert.showMessage("File removed successfully.", "success");
                loadFiles();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    function loadFiles(): void {
        service.getFiles(researchPaper)
            .then((files: DocumentFile[]) => {
                setDocumentFiles(files);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        (researchPaper.id) && (loadFiles());
    }, [researchPaper]);
    return (
        <StackContainer spacing={4}>
            <UploadModal
                controller={modal}
                document={researchPaper}
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

export default ResearchPaperFileUpload;
