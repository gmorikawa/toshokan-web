import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@components/button/action-button";
import BoxContainer from "@components/container/box-container";

import { BackIcon } from "@/common/icons";
import { useResearchPaper } from "@features/research-paper/hooks/research-paper";
import { ResearchPaperInfo } from "@features/research-paper/components/research-paper-info";
import { useResearchPaperFiles } from "@features/research-paper/hooks/research-paper-files";

type ParamsWithId = {
    id: string;
}

export function ResearchPaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { researchPaper } = useResearchPaper(id);
    const { files } = useResearchPaperFiles(researchPaper);

    const navigate = useNavigator();

    function handleBack(): void {
        navigate.to("/app/research-paper/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Research Paper"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {(researchPaper) && <ResearchPaperInfo researchPaper={researchPaper} files={files} />}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ResearchPaperDetailsPage;
