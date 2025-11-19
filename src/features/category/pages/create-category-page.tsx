import type { NewCategory } from "@/entities/models/category";
import { newCategoryValidator } from "@/entities/validators/category/new-category.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import CategoryForm from "@/features/category/components/category-form";

import { BackIcon } from "@/fragments/icons";

export function CreateCategoryPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });

    const form = useForm<NewCategory>({
        default: {
            name: ""
        },
        validator: newCategoryValidator,
        onSubmit: async (entity: NewCategory) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/category/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        router.navigateTo("/app/category/list");
    }

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

export default CreateCategoryPage;
