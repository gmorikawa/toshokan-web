import type { NewLanguage } from "@/entities/models/language";
import { newLanguageValidator } from "@/entities/validators/language/new-language.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";

import LanguageForm from "@/features/language/components/language-form";

import { BackIcon } from "@/fragments/icons";

export function CreateLanguagePage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

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
                router.navigateTo("/app/language/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        router.navigateTo("/app/language/list");
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

            <ApplicationContent>
                <LanguageForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateLanguagePage;
