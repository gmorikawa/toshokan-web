import type { NewResearchPaper } from "@/entities/models/research-paper";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import ResearchPaperForm from "../form";

import { BackIcon } from "@/fragments/icons";

export function CreateResearchPaperFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });

    const form = useForm<NewResearchPaper>({
        default: {
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null,
            keywords: ""
        }
    });

    function handleSave(entity: NewResearchPaper): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/research-paper/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

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
                <ResearchPaperForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateResearchPaperFormPage;
