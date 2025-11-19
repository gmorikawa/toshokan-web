import type { Whitepaper } from "@/entities/models/whitepaper";
import { whitepaperValidator } from "@/entities/validators/whitepaper/whitepaper.validator";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import TabContent from "@/components/tab/tab-content";
import TabControl, { type TabOption } from "@/components/tab/tab-control";

import WhitepaperForm from "@/features/document/whitepaper/components/whitepaper-form";
import WhitepaperFileUpload from "@/features/document/whitepaper/components/whitepaper-file-upload";

import { BackIcon, FileUploadIcon, FormIcon } from "@/fragments/icons";

type ParamsWithId = {
    id?: string;
}

type WhitepaperFormTab = "details" | "files";

const whitepaperFormTabOptions: TabOption<WhitepaperFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];

export function UpdateWhitepaperPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });

    const form = useForm<Whitepaper>({
        default: {
            id: "",
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null,
            documentFiles: []
        },
        validator: whitepaperValidator,
        onSubmit: async (entity: Whitepaper) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                router.navigateTo("/app/whitepaper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Whitepaper) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    function handleBack(): void {
        router.navigateTo("/app/whitepaper/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <TabControl defaultTab="details" options={whitepaperFormTabOptions}>
                    <TabContent tab="details">
                        <WhitepaperForm form={form} onSubmit={handleSubmit} />
                    </TabContent>

                    <TabContent tab="files">
                        <WhitepaperFileUpload whitepaper={form.entity} />
                    </TabContent>
                </TabControl>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateWhitepaperPage;
