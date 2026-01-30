import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewResearchPaper, ResearchPaper } from "@features/research-paper/types/research-paper";
import { newResearchPaperValidator } from "@features/research-paper/utils/validators";
import { ResearchPaperForm } from "@features/research-paper/components/research-paper-form";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@shared/icons";
import { useAuthorization } from "@features/auth/hooks/authorization";

export function CreateResearchPaperFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();
    const service = useResearchPaperService();
    const form = useForm<NewResearchPaper>({
        default: {
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null,
            keywords: "",
            publishingYear: null,
        },
        validator: newResearchPaperValidator,
        onSubmit: async (entity: NewResearchPaper) => {
            if (!form.isValid()) return;
            try {
                service.create(entity)
                    .then((savedResearchPaper: ResearchPaper) => {
                        navigate.to(`/app/research-paper/form/${savedResearchPaper.id}?tab=files`);
                    })
                    .catch((error: Error) => {
                        alert.showErrorMessage(error);
                    });
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/research-paper/list");
    };

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

            <ApplicationContent authorization={authorization}>
                <ResearchPaperForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
