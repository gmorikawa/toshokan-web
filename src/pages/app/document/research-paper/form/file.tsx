import type { ResearchPaper } from "@/entities/models/research-paper";

import useAlert from "@/hooks/feedback/use-alert";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import StackContainer from "@/components/container/stack-container";

import DocumentFileCard from "../../document-file.card";
import UploadModal from "../../upload.modal";

import type { DocumentFile, NewDocumentFile } from "@/entities/models/document-file";
import { useEffect, useState } from "react";
import useModal from "@/components/modal/use-modal";

export interface ResearchPaperFileUploadProps {
    researchPaper: ResearchPaper;
}

export function ResearchPaperFileUpload({ researchPaper }: ResearchPaperFileUploadProps) {
    const alert = useAlert();
    const modal = useModal({
        title: "Upload New File",
        triggerLabel: "Upload File"
    });
    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });
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
