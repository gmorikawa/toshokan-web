import { useCallback } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { BackIcon } from "@shared/icons";

import { ApplicationContent } from "@layout/content";
import { ApplicationHeader } from "@layout/header";
import { ApplicationPage } from "@layout/page";

import { useBookReader } from "@features/book/hooks/book-reader";
import { DocumentReader } from "@features/document/components/document-reader";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

type ParamsWithId = {
    bookId: string;
    documentFileId: string;
}

export function ReadBookPage() {
    const { bookId, documentFileId } = useParams<ParamsWithId>();
    const navigate = useNavigator();
    const reader = useBookReader(bookId, documentFileId);

    const handleBack = useCallback(() => {
        navigate.to(`/app/book/details/${bookId}`);
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

            <ApplicationContent removePadding>
                {(reader.state === "success" && reader.documentFile?.file) && (
                    <DocumentReader
                        fileType={reader.documentFile.file.type}
                        data={reader.blob}
                    />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ReadBookPage;
