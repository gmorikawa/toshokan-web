import { useAlert } from "@components/feedback/alert/controller";
import { useModal } from "@components/modal/use-modal";
import { StackContainer } from "@components/container/stack-container";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";
import { useWhitepaperFiles } from "@features/whitepaper/hooks/whitepaper-files";
import { DocumentFileCard } from "@features/document/components/document-file-card";
import { UploadModal } from "@features/document/components/upload-modal";

export interface WhitepaperFileUploadProps {
    whitepaper: Whitepaper;
}

export function WhitepaperFileUpload({ whitepaper }: WhitepaperFileUploadProps) {
    const alert = useAlert();
    const modal = useModal({
        title: "Upload New File",
        triggerLabel: "Upload File"
    });
    const service = useWhitepaperService();
    const files = useWhitepaperFiles(whitepaper);

    const handleUpload = (documentFile: NewDocumentFile): void => {
        service.upload(whitepaper, documentFile)
            .then(() => {
                modal.close();
                alert.showMessage("File uploaded successfully.", "success");
                files.reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            })
    };

    return (
        <StackContainer spacing={4}>
            <UploadModal
                controller={modal}
                document={whitepaper}
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
