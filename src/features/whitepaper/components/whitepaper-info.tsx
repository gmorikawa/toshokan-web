import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile } from "@features/document/types/document-file";
import { DocumentFileCard } from "@features/document/components/document-file-card";

import { BoxContainer } from "@components/container/box-container";
import { Badge } from "@components/data-display/badge";
import Information from "@components/data-display/information";
import { Heading } from "@components/typography/heading";
import { Paragraph } from "@components/typography/paragraph";

export interface WhitepaperInfoProps {
    whitepaper: Whitepaper;
    files: DocumentFile[];
    
    onRemove?: (documentFile: DocumentFile) => void;
    onDownload?: (documentFile: DocumentFile) => void;
    onRead?: (documentFile: DocumentFile) => void;
}

export function WhitepaperInfo({ whitepaper, files, onRemove, onDownload, onRead }: WhitepaperInfoProps) {
    return (
        <BoxContainer display="flex" flexDirection="column" gap={2}>
            <Heading level={2} size="2xl">
                {whitepaper.title}
            </Heading>

            <BoxContainer display="flex" gap={2}>
                {whitepaper.topics.length > 0 && whitepaper.topics.map((topic) => (
                    <Badge key={topic.id}>
                        {topic.name}
                    </Badge>
                ))}
            </BoxContainer>

            <BoxContainer display="flex" flexDirection="row" gap={8}>
                <BoxContainer flex="2" display="flex" flexDirection="column" gap={4}>
                    <Paragraph align="justify">{whitepaper.summary}</Paragraph>

                    <BoxContainer display="flex" flexDirection="column" gap={2}>
                        {files.map((file) => (
                            <DocumentFileCard
                                key={file.id}
                                documentFile={file}
                                onRemove={onRemove}
                                onDownload={onDownload}
                                onRead={onRead}
                            />
                        ))}
                    </BoxContainer>
                </BoxContainer>

                <BoxContainer flex="1">
                    <Information.Container>
                        <Information.Item label="Publishing Year">
                            {whitepaper.publishingYear !== null ? whitepaper.publishingYear : "N/A"}
                        </Information.Item>

                        <Information.Item label="Organization">
                            {whitepaper.organization ? whitepaper.organization.name : "N/A"}
                        </Information.Item>

                        <Information.Item label="Authors">
                            {whitepaper.authors.length > 0 ? whitepaper.authors.map((author) => author.fullname).join(", ") : "N/A"}
                        </Information.Item>

                        <Information.Item label="Language">
                            {whitepaper.language ? whitepaper.language.name : "N/A"}
                        </Information.Item>
                    </Information.Container>
                </BoxContainer>
            </BoxContainer>
        </BoxContainer>
    );
}
