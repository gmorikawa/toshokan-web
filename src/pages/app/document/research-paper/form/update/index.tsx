import type { ResearchPaper } from "@/entities/models/research-paper";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import ResearchPaperForm from "../form";

import { BackIcon, FileUploadIcon, FormIcon } from "@/fragments/icons";
import { TabControl, type TabOption } from "@/components/tab/tab-control";
import TabContent from "@/components/tab/tab-content";
import ResearchPaperFileUpload from "../file";
import { researchPaperValidator } from "@/entities/validators/research-paper/research-paper.validator";

type ParamsWithId = {
    id?: string;
}

type ResearchPaperFormTab = "details" | "files";

const researchPaperFormTabOptions: TabOption<ResearchPaperFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];


export function UpdateResearchPaperFormPage() {
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
        validator: researchPaperValidator
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

    // ...existing code...
    // Only one form declaration should exist, so replace the original with the new config above.
    // Remove the duplicate declaration.

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

export default UpdateResearchPaperFormPage;
