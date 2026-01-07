import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewResearchPaper } from "@features/research-paper/types/research-paper";
import { newResearchPaperValidator } from "@features/research-paper/utils/validators";
import { ResearchPaperForm } from "@features/research-paper/components/research-paper-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useService } from "@/services/use-service";
import { ResearchPaperService } from "@/services/research-paper-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@/common/icons";
import { useAuthorizationFilter } from "@features/auth/hooks/use-authorization-filter";

export function CreateResearchPaperPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

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
                navigate.to("/app/research-paper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

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

            <ApplicationContent authorization={authorization}>
                <ResearchPaperForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateResearchPaperPage;
