import { BoxContainer } from "@components/container/box-container";
import { Paragraph } from "@components/typography/paragraph";
import { StackContainer } from "@components/container/stack-container";

import type { DocumentFile } from "@features/document/types/document-file";

import type { File } from "@features/file/types/file";
import { EPUBIcon, PDFIcon } from "@shared/icons";

interface FileIconsProps {
    file: File;
}

function FileIcons({ file }: FileIconsProps) {
    switch (file.type.mimeType) {
        case "application/pdf":
            return <PDFIcon width="32px" />;
        case "application/epub+zip":
            return <EPUBIcon width="32px" />;
        default:
            return "📁";
    }
}

export interface DocumentFileItem {
    index: number;
    shouldRemove: boolean;
    file: DocumentFile;
}

export interface DocumentFileListProps {
    files: DocumentFile[];

    emptySlot?: React.ReactNode;
    actionsSlot?: (file: DocumentFile, index: number) => React.ReactNode;
}

export function DocumentFileList({
    files,
    emptySlot,
    actionsSlot
}: DocumentFileListProps) {
    return (
        <StackContainer spacing={1}>
            {files.map((file: DocumentFile, index: number) => (
                <BoxContainer
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <BoxContainer
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        <FileIcons file={file.file!} />
                        <Paragraph size="sm">
                            {file.file?.filename}
                        </Paragraph>
                    </BoxContainer>

                    <BoxContainer>
                        {(actionsSlot) && (actionsSlot(file, index))}
                    </BoxContainer>
                </BoxContainer>
            ))}

            {(files.length === 0) && (emptySlot)}
        </StackContainer>
    );
}
