import type { Language } from "@/entities/models/language";
import { languageValidator } from "@/entities/validators/language/language.validator";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import LanguageForm from "@/features/language/components/language-form";

import { BackIcon } from "@/fragments/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

export function UpdateLanguagePage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });

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
                router.navigateTo("/app/language/list");
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
        router.navigateTo("/app/language/list");
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
