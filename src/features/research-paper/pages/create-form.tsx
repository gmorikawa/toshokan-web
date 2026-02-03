import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import type { NewResearchPaper, ResearchPaper } from "@features/research-paper/types/research-paper";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { useResearchPaperFileUpload } from "@features/research-paper/hooks/research-paper-file-upload";
import { newResearchPaperValidator } from "@features/research-paper/utils/validators";
import { ResearchPaperForm } from "@features/research-paper/components/research-paper-form";

export function ResearchPaperCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useResearchPaperService();
    const uploader = useResearchPaperFileUpload();
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
            service.create(entity)
                .then((savedResearchPaper: ResearchPaper) => {
                    return uploader.upload(savedResearchPaper);
                })
                .then(() => {
                    navigate.to("/app/research-paper/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
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
                    uploader={uploader}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
