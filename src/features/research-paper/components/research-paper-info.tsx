import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { DocumentFileCard } from "@features/document/components/document-file-card";

import { BoxContainer } from "@components/container/box-container";
import { Badge } from "@components/data-display/badge";
import Information from "@components/data-display/information";
import { Heading } from "@components/typography/heading";
import { Paragraph } from "@components/typography/paragraph";
import type { DocumentFile } from "@features/document/types/document-file";

export interface ResearchPaperInfoProps {
    researchPaper: ResearchPaper;
    files: DocumentFile[];

    onRemove?: (documentFile: DocumentFile) => void;
    onDownload?: (documentFile: DocumentFile) => void;
    onRead?: (documentFile: DocumentFile) => void;
}

export function ResearchPaperInfo({ researchPaper, files, onRemove, onDownload, onRead }: ResearchPaperInfoProps) {
    return (
        <BoxContainer display="flex" flexDirection="column" gap={2}>
            <Heading level={2} size="2xl">
                {researchPaper.title}
            </Heading>

            <BoxContainer display="flex" gap={2}>
                {researchPaper.topics.length > 0 && researchPaper.topics.map((topic) => (
                    <Badge key={topic.id}>
                        {topic.name}
                    </Badge>
                ))}
            </BoxContainer>

            <BoxContainer display="flex" flexDirection="row" gap={8}>
                <BoxContainer flex="2" display="flex" flexDirection="column" gap={4}>
                    <Paragraph align="justify">{researchPaper.summary}</Paragraph>

                    <BoxContainer display="flex" flexDirection="column" gap={2}>
                        {files.map((file) => (
                            <DocumentFileCard
                                key={file.id}
                                documentFile={file}
                                onDownload={onDownload}
                                onRemove={onRemove}
                                onRead={onRead}
                            />
                        ))}
                    </BoxContainer>
                </BoxContainer>

                <BoxContainer flex="1">
                    <Information.Container>
                        <Information.Item label="Publishing Year">
                            {researchPaper.publishingYear !== null ? researchPaper.publishingYear : "N/A"}
                        </Information.Item>

                        <Information.Item label="Organization">
                            {researchPaper.organization ? researchPaper.organization.name : "N/A"}
                        </Information.Item>

                        <Information.Item label="Authors">
                            {researchPaper.authors.length > 0 ? researchPaper.authors.map((author) => author.fullname).join(", ") : "N/A"}
                        </Information.Item>

                        <Information.Item label="Language">
                            {researchPaper.language ? researchPaper.language.name : "N/A"}
                        </Information.Item>

                        <Information.Item label="Keywords">
                            {researchPaper.keywords || "N/A"}
                        </Information.Item>
                    </Information.Container>
                </BoxContainer>
            </BoxContainer>
        </BoxContainer>
    );
}
