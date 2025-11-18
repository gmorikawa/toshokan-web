import type { NewWhitepaper } from "@/entities/models/whitepaper";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import WhitepaperForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { newWhitepaperValidator } from "@/entities/validators/whitepaper/new-whitepaper.validator";

export function CreateWhitepaperFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });

    const form = useForm<NewWhitepaper>({
        default: {
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null
        },
        validator: newWhitepaperValidator,
        onSubmit: async (entity: NewWhitepaper) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/whitepaper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        router.navigateTo("/app/whitepaper/list");
    }

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
                <WhitepaperForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateWhitepaperFormPage;
