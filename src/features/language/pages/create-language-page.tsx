import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewLanguage } from "@features/language/types/language";
import { newLanguageValidator } from "@features/language/utils/validators";
import { useAuthorizationFilter } from "@features/auth/hooks/use-authorization-filter";
import { LanguageForm } from "@features/language/components/language-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useService } from "@/services/use-service";
import { LanguageService } from "@/services/language-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@/common/icons";

export function CreateLanguagePage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });

    const form = useForm<NewLanguage>({
        default: {
            name: ""
        },
        validator: newLanguageValidator,
        onSubmit: async (entity: NewLanguage) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/language/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        navigate.to("/app/language/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Language"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LanguageForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateLanguagePage;
