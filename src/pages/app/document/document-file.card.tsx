import type { DocumentFile } from "@/entities/models/document-file";

import ActionButton from "@/components/button/action-button";
import Card from "@/components/card/card";
import FlexContainer from "@/components/container/flex-container";

import { DataList } from "@chakra-ui/react";

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
            title={documentFile.version}
            footer={(
                <FlexContainer justify="flex-end" spacing={2}>
                    <ActionButton palette="danger" onClick={handleRemove}>
                        Remove
                    </ActionButton>

                    <ActionButton onClick={handleDownload}>
                        Download
                    </ActionButton>
                </FlexContainer>
            )}
        >
            <DataList.Root>
                <DataList.Item>
                    <DataList.ItemLabel>Publishing Year</DataList.ItemLabel>
                    <DataList.ItemValue>{documentFile?.publishingYear}</DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                    <DataList.ItemLabel>Description</DataList.ItemLabel>
                    <DataList.ItemValue>{documentFile?.description}</DataList.ItemValue>
                </DataList.Item>
            </DataList.Root>
        </Card>
    );
}

export default DocumentFileCard;