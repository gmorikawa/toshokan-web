import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { useResearchPaperFiles } from "@features/research-paper/hooks/research-paper-files";
import { useResearchPaperFileUpload } from "@features/research-paper/hooks/research-paper-file-upload";
import { researchPaperValidator } from "@features/research-paper/utils/validators";
import { ResearchPaperForm } from "@features/research-paper/components/research-paper-form";

type ParamsWithId = {
    id: string;
}

export function ResearchPaperUpdateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const { id } = useParams<ParamsWithId>();
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useResearchPaperService();
    const files = useResearchPaperFiles(id);
    const uploader = useResearchPaperFileUpload();
    const form = useForm<ResearchPaper>({
        default: {
            id: "",
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null,
            keywords: "",
            documentFiles: [],
            publishingYear: null,
        },
        validator: researchPaperValidator,
        onSubmit: async (entity: ResearchPaper) => {
            if (!form.isValid()) return;
            service.update(entity)
                .then((updatedResearchPaper: ResearchPaper) => {
                    return uploader.upload(updatedResearchPaper);
                })
                .then(() => {
                    navigate.to("/app/research-paper/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: ResearchPaper) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/research-paper/list");
    };

    useEffect(() => {
        loadEntity();
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

            <ApplicationContent authorization={authorization}>
                <ResearchPaperForm
                    form={form}
                    files={files}
                    uploader={uploader}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
