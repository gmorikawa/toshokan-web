import { useCallback } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationContent } from "@shared/application/components/application-content";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationPage } from "@shared/application/components/application-page";
import { BackIcon } from "@shared/icons";

import { useWhitepaperReader } from "@features/whitepaper/hooks/whitepaper-reader";
import { DocumentReader } from "@features/document/components/document-reader";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

type ParamsWithId = {
    whitepaperId: string;
    documentFileId: string;
}

export function ReadWhitepaperPage() {
    const { whitepaperId, documentFileId } = useParams<ParamsWithId>();
    const navigate = useNavigator();
    const reader = useWhitepaperReader(whitepaperId, documentFileId);

    const handleBack = useCallback(() => {
        navigate.to(`/app/whitepaper/details/${whitepaperId}`);
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
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
