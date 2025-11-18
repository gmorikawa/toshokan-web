import type { Category } from "@/entities/models/category";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import CategoryForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { categoryValidator } from "@/entities/validators/category/category.validator";

type ParamsWithId = {
    id?: string;
}

export function UpdateCategoryFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });

    const form = useForm<Category>({
        default: {
            id: "",
            name: ""
        },
        validator: categoryValidator
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

    // ...existing code...
    // Only one form declaration should exist, so replace the original with the new config above.
    // Remove the duplicate declaration.

    function handleBack(): void {
        router.navigateTo("/app/category/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Category"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <CategoryForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateCategoryFormPage;
