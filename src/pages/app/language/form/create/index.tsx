import type { NewLanguage } from "@/entities/models/language";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

import useForm from "@/components/form/use-form";
import LanguageForm from "../form";

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

    return (
        <LanguageForm
            form={form}
            onSubmit={handleSave}
        />
    );
}

export default CreateLanguageFormPage;
