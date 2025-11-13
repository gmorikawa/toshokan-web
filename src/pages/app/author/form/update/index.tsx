import type { Author } from "@/entities/models/author";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

import useForm from "@/components/form/use-form";
import AuthorForm from "../form";

type ParamsWithId = {
    id?: string;
}

export function UpdateAuthorFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });

    const form = useForm<Author>({
        default: {
            id: "",
            fullname: "",
            biography: ""
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Author) => {
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
                router.navigateTo("/app/author/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <AuthorForm form={form} onSubmit={handleSave} />
    );
}

export default UpdateAuthorFormPage;
