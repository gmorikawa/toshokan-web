import type { NewResearchPaper } from "@/entities/models/research-paper";
import { newResearchPaperValidator } from "@/entities/validators/research-paper/new-research-paper.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";

import ResearchPaperForm from "@/features/document/research-paper/components/research-paper-form";

import { BackIcon } from "@/fragments/icons";

export function CreateResearchPaperPage() {
    function handleSubmit() {
        form.submit();
    }
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
        },
        validator: newResearchPaperValidator,
        onSubmit: async (entity: NewResearchPaper) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/research-paper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

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
                <ResearchPaperForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateResearchPaperPage;
