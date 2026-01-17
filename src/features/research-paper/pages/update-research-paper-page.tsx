import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useQuery } from "@shared/router/hooks/query";
import { useNavigator } from "@shared/router/hooks/navigator";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { researchPaperValidator } from "@features/research-paper/utils/validators";
import { ResearchPaperForm } from "@features/research-paper/components/research-paper-form";
import { ResearchPaperFileUpload } from "@features/research-paper/components/research-paper-file-upload";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";
import { TabContent } from "@components/tab/tab-content";
import { TabControl, type TabOption } from "@components/tab/tab-control";

import { BackIcon, FileUploadIcon, FormIcon } from "@shared/icons";

type ParamsWithId = {
    id?: string;
}

type QueryWithTab = {
    tab?: ResearchPaperFormTab;
}

type ResearchPaperFormTab = "details" | "files";

const researchPaperFormTabOptions: TabOption<ResearchPaperFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];


export function UpdateResearchPaperPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();
    const { id } = useParams<ParamsWithId>();
    const { tab } = useQuery<QueryWithTab>();

    const service = useResearchPaperService();

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
            try {
                await service.update(entity);
                navigate.to("/app/research-paper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
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

    function handleBack(): void {
        navigate.to("/app/research-paper/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

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
                <TabControl defaultTab={tab ?? "details"} options={researchPaperFormTabOptions}>
                    <TabContent tab="details">
                        <ResearchPaperForm form={form} onSubmit={handleSubmit} />
                    </TabContent>

                    <TabContent tab="files">
                        <ResearchPaperFileUpload researchPaper={form.entity} />
                    </TabContent>
                </TabControl>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateResearchPaperPage;
