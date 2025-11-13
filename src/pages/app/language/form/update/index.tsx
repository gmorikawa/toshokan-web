import type { Language } from "@/entities/models/language";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

import useForm from "@/components/form/use-form";
import LanguageForm from "../form";

type ParamsWithId = {
    id?: string;
}

export function UpdateLanguageFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });

    const form = useForm<Language>({
        default: {
            id: "",
            name: ""
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

    function handleSave(): void {
        service.update(form.entity)
            .then(() => {
                router.navigateTo("/app/language/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <LanguageForm form={form} onSubmit={handleSave} />
    );
}

export default UpdateLanguageFormPage;
