import { BoxContainer } from "@components/container/box-container";
import { Paragraph } from "@components/typography/paragraph";

import type { Book } from "@features/book/types/book";
import { buildBookFullTitle } from "@features/book/utils/builder";

export interface BookTitleProps {
    book: Book;
}

export function BookTitle({ book }: BookTitleProps) {
    return (
        <BoxContainer>
            <Paragraph>{buildBookFullTitle(book)}</Paragraph>
            {book.edition && (<Paragraph style={{ color: "gray" }}>{book.edition}</Paragraph>)}
        </BoxContainer>
    );
}
