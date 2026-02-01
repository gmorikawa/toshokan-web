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

import type { Language } from "@features/language/types/language";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useLanguageService } from "@features/language/hooks/language-service";
import { languageValidator } from "@features/language/utils/validators";
import { LanguageForm } from "@features/language/components/language-form";

type ParamsWithId = {
    id?: string;
}

export function LanguageUpdateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();
    const { id } = useParams<ParamsWithId>();

    const service = useLanguageService();

    const form = useForm<Language>({
        default: {
            id: "",
            name: ""
        },
        validator: languageValidator,
        onSubmit: async (entity: Language) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                navigate.to("/app/language/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    const loadEntity = async (): Promise<void> => {
        if (id) {
            return service.getById(id)
                .then((entity: Language) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    const handleSubmit = () => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/language/list");
    };

    useEffect(() => {
        loadEntity();
    }, []);
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
