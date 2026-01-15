import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewCategory } from "@features/category/types/category";
import { newCategoryValidator } from "@features/category/utils/validators";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { CategoryForm } from "@features/category/components/category-form";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { useCategoryService } from "@features/category/hooks/category-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@shared/icons";

export function CreateCategoryPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useCategoryService();

    const form = useForm<NewCategory>({
        default: {
            name: ""
        },
        validator: newCategoryValidator,
        onSubmit: async (entity: NewCategory) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/category/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        navigate.to("/app/category/list");
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

            <ApplicationContent authorization={authorization}>
                <CategoryForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateCategoryPage;
