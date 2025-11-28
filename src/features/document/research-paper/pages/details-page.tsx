import useRouter from "@/hooks/router/use-router";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { BackIcon } from "@/fragments/icons";
import { useResearchPaper } from "../hooks/use-research-paper";
import useParams from "@/hooks/router/use-params";
import { ResearchPaperInfo } from "../components/research-paper-info";
import { useResearchPaperFiles } from "../hooks/use-research-paper-files";

type ParamsWithId = {
    id: string;
}

export function ResearchPaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { researchPaper } = useResearchPaper(id);
    const { files } = useResearchPaperFiles(researchPaper);

    const router = useRouter();

    function handleBack(): void {
        router.navigateTo("/app/research-paper/list");
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
