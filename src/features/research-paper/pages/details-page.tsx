import { useCallback } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { BackIcon } from "@shared/icons";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";

import type { DocumentFile } from "@features/document/types/document-file";
import { useResearchPaper } from "@features/research-paper/hooks/research-paper";
import { ResearchPaperInfo } from "@features/research-paper/components/research-paper-info";
import { useResearchPaperFiles } from "@features/research-paper/hooks/research-paper-files";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

type ParamsWithId = {
    id: string;
}

export function ResearchPaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const researchPaper = useResearchPaper(id);
    const files = useResearchPaperFiles(researchPaper.entity);
    const navigate = useNavigator();

    const handleBack = useCallback(() => {
        navigate.to("/app/research-paper/list");
    }, []);

    const handleRead = useCallback((documentFile: DocumentFile) => {
        navigate.to(`/app/research-paper/details/${id}/read/${documentFile.id}`);
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

            <ApplicationContent>
                {(researchPaper.entity) && (
                    <ResearchPaperInfo
                        researchPaper={researchPaper.entity}
                        files={files.data}
                        onDownload={files.handleDownload}
                        onRemove={files.handleRemove}
                        onRead={handleRead}
                    />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ResearchPaperDetailsPage;
