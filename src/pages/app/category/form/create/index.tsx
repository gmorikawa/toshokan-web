import type { NewCategory } from "@/entities/models/category";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

import useForm from "@/components/form/use-form";
import CategoryForm from "../form";

export function CreateCategoryFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });

    const form = useForm<NewCategory>({
        default: {
            name: ""
        }
    });

    function handleSave(entity: NewCategory): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/category/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    return (
        <CategoryForm
            form={form}
            onSubmit={handleSave}
        />
    );
}

export default CreateCategoryFormPage;
