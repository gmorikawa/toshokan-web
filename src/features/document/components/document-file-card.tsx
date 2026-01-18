import type { DocumentFile } from "@features/document/types/document-file";

import Card from "@components/card/card";
import FlexContainer from "@components/container/flex-container";
import Information from "@components/data-display/information";
import RestrictedContent from "@features/auth/components/restricted-content";
import Badge from "@components/data-display/badge";

import { DownloadButton } from "@layout/button/download";
import { DeleteButton } from "@layout/button/delete";

export interface DocumentFileCardProps {
    documentFile: DocumentFile;

    onRemove?: (documentFile: DocumentFile) => void;
    onDownload?: (documentFile: DocumentFile) => void;
}

export function DocumentFileCard({ documentFile, onRemove, onDownload }: DocumentFileCardProps) {
    function handleRemove(): void {
        (onRemove) && (onRemove(documentFile));
    }

    function handleDownload(): void {
        (onDownload) && (onDownload(documentFile));
    }

    return (
        <Card
            footer={(
                <FlexContainer justify="flex-end" spacing={2}>
                    <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                        <DeleteButton onClick={handleRemove} />
                    </RestrictedContent>

                    <DownloadButton onClick={handleDownload} />
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

export default DocumentFileCard;