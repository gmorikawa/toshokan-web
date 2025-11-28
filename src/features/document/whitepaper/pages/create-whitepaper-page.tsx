import type { NewWhitepaper } from "@/entities/models/whitepaper";
import { newWhitepaperValidator } from "@/entities/validators/whitepaper/new-whitepaper.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";

import WhitepaperForm from "@/features/document/whitepaper/components/whitepaper-form";

import { BackIcon } from "@/fragments/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function CreateWhitepaperPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

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

            <ApplicationContent authorization={authorization}>
                <WhitepaperForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateWhitepaperPage;
