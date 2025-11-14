import type { NewLanguage } from "@/entities/models/language";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import LanguageForm from "../form";

import { BackIcon } from "@/fragments/icons";

export function CreateLanguageFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });

    const form = useForm<NewLanguage>({
        default: {
            name: ""
        }
    });

    function handleSave(entity: NewLanguage): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/language/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

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
                <LanguageForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateLanguageFormPage;
