import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";

import type { Language } from "@features/language/types/language";
import { languageValidator } from "@features/language/utils/validators";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { LanguageForm } from "@features/language/components/language-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useLanguageService } from "@features/language/hooks/language-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@shared/icons";

type ParamsWithId = {
    id?: string;
}

export function UpdateLanguagePage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
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

    async function loadEntity(): Promise<void> {
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

    function handleBack(): void {
        navigate.to("/app/language/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

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

export default UpdateLanguagePage;
