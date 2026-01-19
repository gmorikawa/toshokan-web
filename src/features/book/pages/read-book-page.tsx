import { useParams } from "@shared/router/hooks/params";
import { BackIcon } from "@shared/icons";

import { ApplicationContent } from "@layout/content";
import { ApplicationHeader } from "@layout/header";
import { ApplicationPage } from "@layout/page";

import { useBookReader } from "@features/book/hooks/book-reader";
import { PDFReader } from "@features/file/components/pdf-reader";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

type ParamsWithId = {
    bookId: string;
    documentFileId: string;
}

export function ReadBookPage() {
    const { bookId, documentFileId } = useParams<ParamsWithId>();

    const reader = useBookReader(bookId, documentFileId);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Book"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={() => null}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {(reader.state === "success") && (
                    <PDFReader data={reader.blob} />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ReadBookPage;
