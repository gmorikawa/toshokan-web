import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { useResearchPaperFiles } from "@features/research-paper/hooks/research-paper-files";
import { DocumentFileCard } from "@features/document/components/document-file-card";
import { UploadModal } from "@features/document/components/upload-modal";

import { useModal } from "@components/modal/use-modal";
import { useAlert } from "@components/feedback/alert/controller";
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
    const files = useResearchPaperFiles(researchPaper);

    function handleUpload(documentFile: NewDocumentFile): void {
        service.upload(researchPaper, documentFile)
            .then(() => {
                modal.close();
                alert.showMessage("File uploaded successfully.", "success");
                files.reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    return (
        <StackContainer spacing={4}>
            <UploadModal
                controller={modal}
                document={researchPaper}
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

export default ResearchPaperFileUpload;
