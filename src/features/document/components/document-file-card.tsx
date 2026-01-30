import { useCallback } from "react";

import { DeleteButton } from "@shared/application/components/delete-button";
import { DownloadButton } from "@shared/application/components/download-button";
import { ReadButton } from "@shared/application/components/read-button";

import { Badge } from "@components/data-display/badge";
import { Card } from "@components/card/card";
import { FlexContainer } from "@components/container/flex-container";
import Information from "@components/data-display/information";

import type { DocumentFile } from "@features/document/types/document-file";
import { RestrictedContent } from "@features/auth/components/restricted-content";

export interface DocumentFileCardProps {
    documentFile: DocumentFile;

    onRemove?: (documentFile: DocumentFile) => void;
    onDownload?: (documentFile: DocumentFile) => void;
    onRead?: (documentFile: DocumentFile) => void;
}

export function DocumentFileCard({ documentFile, onRemove, onDownload, onRead }: DocumentFileCardProps) {
    const handleRemove = useCallback((): void => {
        (onRemove) && (onRemove(documentFile));
    }, [documentFile, onRemove]);

    const handleDownload = useCallback((): void => {
        (onDownload) && (onDownload(documentFile));
    }, [documentFile, onDownload]);

    const handleRead = useCallback((): void => {
        (onRead) && (onRead(documentFile));
    }, [documentFile, onRead]);

    return (
        <Card
            footer={(
                <FlexContainer justify="flex-end" spacing={2}>
                    <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                        <DeleteButton onClick={handleRemove} />
                    </RestrictedContent>

                    <DownloadButton onClick={handleDownload} />
                    <ReadButton onClick={handleRead} />
                </FlexContainer>
            )}
        >
            <Information.Container>
                <Information.Item label="Description">
                    {documentFile?.description}
                </Information.Item>

                <Information.Item label="File Type">
                    <Badge>
                        {documentFile?.file?.type?.extension}
                    </Badge>
                </Information.Item>
            </Information.Container>
        </Card>
    );
}
