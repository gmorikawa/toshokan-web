import type { Book } from "@features/book/types/book";
import type { DocumentFile } from "@features/document/types/document-file";
import { DocumentFileCard } from "@features/document/components/document-file-card";
import { buildBookFullTitle } from "@features/book/utils/builder";

import { BoxContainer } from "@components/container/box-container";
import { Badge } from "@components/data-display/badge";
import Information from "@components/data-display/information";
import { Heading } from "@components/typography/header-typography";
import { Paragraph } from "@components/typography/paragraph";

export interface BookInfoProps {
    book: Book;
    files: DocumentFile[];

    onRemove?: (documentFile: DocumentFile) => void;
    onDownload?: (documentFile: DocumentFile) => void;
}

export function BookInfo({ book, files, onRemove, onDownload }: BookInfoProps) {
    return (
        <BoxContainer display="flex" flexDirection="column" gap={2}>
            <Heading level={2} size="2xl">
                {buildBookFullTitle(book)}
            </Heading>

            <BoxContainer display="flex" gap={2}>
                {book.topics.length > 0 && book.topics.map((topic) => (
                    <Badge key={topic.id}>
                        {topic.name}
                    </Badge>
                ))}
            </BoxContainer>

            <BoxContainer display="flex" flexDirection="row" gap={8}>
                <BoxContainer flex="2" display="flex" flexDirection="column" gap={4}>

                    {book?.summary?.split("\n").map((paragraph, index) => (
                        <Paragraph key={index} align="justify">{paragraph}</Paragraph>
                    ))}

                    <BoxContainer display="flex" flexDirection="column" gap={2}>
                        {files.map((file) => (
                            <DocumentFileCard key={file.id} documentFile={file} onRemove={onRemove} onDownload={onDownload} />
                        ))}
                    </BoxContainer>
                </BoxContainer>

                <BoxContainer flex="1">
                    <Information.Container>
                        <Information.Item label="Edition">
                            {book.edition ? book.edition : "N/A"}
                        </Information.Item>

                        <Information.Item label="Publisher">
                            {book.publisher ? book.publisher.name : "N/A"}
                        </Information.Item>

                        <Information.Item label="Publishing Year">
                            {book.publishingYear !== null ? book.publishingYear : "N/A"}
                        </Information.Item>

                        <Information.Item label="Authors">
                            {book.authors.length > 0 ? book.authors.map((author) => author.fullname).join(", ") : "N/A"}
                        </Information.Item>

                        <Information.Item label="Language">
                            {book.language ? book.language.name : "N/A"}
                        </Information.Item>

                        <Information.Item label="Category">
                            {book.category ? book.category.name : "N/A"}
                        </Information.Item>
                    </Information.Container>
                </BoxContainer>
            </BoxContainer>
        </BoxContainer>
    );
}