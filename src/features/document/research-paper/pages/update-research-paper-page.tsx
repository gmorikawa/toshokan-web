import type { ResearchPaper } from "@/entities/models/research-paper";
import { researchPaperValidator } from "@/entities/validators/research-paper/research-paper.validator";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import TabContent from "@/components/tab/tab-content";
import TabControl, { type TabOption } from "@/components/tab/tab-control";

import ResearchPaperForm from "@/features/document/research-paper/components/research-paper-form";
import ResearchPaperFileUpload from "@/features/document/research-paper/components/research-paper-file-upload";

import { BackIcon, FileUploadIcon, FormIcon } from "@/fragments/icons";

type ParamsWithId = {
    id?: string;
}

type ResearchPaperFormTab = "details" | "files";

const researchPaperFormTabOptions: TabOption<ResearchPaperFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];


export function UpdateResearchPaperPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });

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
            documentFiles: []
        },
        validator: researchPaperValidator,
        onSubmit: async (entity: ResearchPaper) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                router.navigateTo("/app/research-paper/list");
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
        router.navigateTo("/app/research-paper/list");
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

            <ApplicationContent>
                <TabControl defaultTab="details" options={researchPaperFormTabOptions}>
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
