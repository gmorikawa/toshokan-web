import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewWhitepaper } from "@features/whitepaper/types/whitepaper";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { newWhitepaperValidator } from "@features/whitepaper/utils/validators";
import { WhitepaperForm } from "@features/whitepaper/components/whitepaper-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@/common/icons";

export function CreateWhitepaperPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useWhitepaperService();

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
                navigate.to("/app/whitepaper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        navigate.to("/app/whitepaper/list");
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
