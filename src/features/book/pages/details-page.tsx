import { useCallback } from "react";

import { useNavigator } from "@shared/router/hooks/navigator";
import { useParams } from "@shared/router/hooks/params";
import { BackIcon } from "@shared/icons";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { useBook } from "@features/book/hooks/book";
import { BookInfo } from "@features/book/components/book-info";
import { useBookFiles } from "@features/book/hooks/book-files";

type ParamsWithId = {
    id: string;
}

export function BookDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { book } = useBook(id);
    const files = useBookFiles(book);
    const navigate = useNavigator();

    const handleBack = useCallback(() => {
        navigate.to("/app/book/list");
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Book"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleBack}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {(book) && (
                    <BookInfo
                        book={book}
                        files={files.data}
                        onDownload={files.handleDownload}
                        onRemove={files.handleRemove}
                    />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default BookDetailsPage;
