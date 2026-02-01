import { useCallback } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { BackIcon } from "@shared/icons";
import { ApplicationContent } from "@shared/application/components/application-content";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationPage } from "@shared/application/components/application-page";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { useResearchPaperReader } from "@features/research-paper/hooks/research-paper-reader";
import { DocumentReader } from "@features/document/components/document-reader";

type ParamsWithId = {
    researchPaperId: string;
    documentFileId: string;
}

export function ResearchPaperReadPage() {
    const { researchPaperId, documentFileId } = useParams<ParamsWithId>();
    const navigate = useNavigator();
    const reader = useResearchPaperReader(researchPaperId, documentFileId);

    const handleBack = useCallback(() => {
        navigate.to(`/app/research-paper/details/${researchPaperId}`);
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Research Paper"
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
