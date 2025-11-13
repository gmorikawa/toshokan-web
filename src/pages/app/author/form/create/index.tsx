import type { NewAuthor } from "@/entities/models/author";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

import useForm from "@/components/form/use-form";
import AuthorForm from "../form";

export function CreateAuthorFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });

    const form = useForm<NewAuthor>({
        default: {
            fullname: "",
            biography: ""
        }
    });

    function handleSave(entity: NewAuthor): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/author/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    return (
        <AuthorForm
            form={form}
            onSubmit={handleSave}
        />
    );
}

export default CreateAuthorFormPage;
