import { BoxContainer } from "@components/container/box-container";
import { Paragraph } from "@components/typography/paragraph";
import { StackContainer } from "@components/container/stack-container";

import type { UploadDocumentFile } from "@features/document/types/document-file";

export interface DocumentUploadFileListProps {
    uploadFiles: UploadDocumentFile[];

    emptySlot?: React.ReactNode;
    actionsSlot?: (uploadFile: UploadDocumentFile, index: number) => React.ReactNode;
}

export function DocumentUploadFileList({
    uploadFiles,
    emptySlot,
    actionsSlot
}: DocumentUploadFileListProps) {
    return (
        <StackContainer spacing={1}>
            {uploadFiles.map((uploadFile: UploadDocumentFile, index: number) => (
                <BoxContainer
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Paragraph size="sm">
                        {uploadFile.binary.name}
                    </Paragraph>

                    <BoxContainer>
                        {(actionsSlot) && (actionsSlot(uploadFile, index))}
                    </BoxContainer>
                </BoxContainer>
            ))}

            {(uploadFiles.length === 0) && (emptySlot)}
        </StackContainer>
    );
}
