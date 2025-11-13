import type { Category } from "@/entities/models/category";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

import useForm from "@/components/form/use-form";
import CategoryForm from "../form";

type ParamsWithId = {
    id?: string;
}

export function UpdateCategoryFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });

    const form = useForm<Category>({
        default: {
            id: "",
            name: ""
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Category) => {
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
                router.navigateTo("/app/category/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <CategoryForm form={form} onSubmit={handleSave} />
    );
}

export default UpdateCategoryFormPage;
