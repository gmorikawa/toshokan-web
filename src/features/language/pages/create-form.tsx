import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import type { NewLanguage } from "@features/language/types/language";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useLanguageService } from "@features/language/hooks/language-service";
import { newLanguageValidator } from "@features/language/utils/validators";
import { LanguageForm } from "@features/language/components/language-form";

export function LanguageCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useLanguageService();

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

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/language/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Language"
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
                <LanguageForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
