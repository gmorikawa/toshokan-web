import { useCallback } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { BackIcon } from "@shared/icons";

import { ApplicationContent } from "@layout/content";
import { ApplicationHeader } from "@layout/header";
import { ApplicationPage } from "@layout/page";

import { useResearchPaperReader } from "@features/research-paper/hooks/research-paper-reader";
import { PDFReader } from "@features/file/components/pdf-reader";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

type ParamsWithId = {
    researchPaperId: string;
    documentFileId: string;
}

export function ReadResearchPaperPage() {
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
                {(reader.state === "success") && (
                    <PDFReader data={reader.blob} />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ReadResearchPaperPage;
