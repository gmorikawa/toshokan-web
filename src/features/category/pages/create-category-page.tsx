import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { NewCategory } from "@features/category/types/category";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useCategoryService } from "@features/category/hooks/category-service";
import { newCategoryValidator } from "@features/category/utils/validators";
import { CategoryForm } from "@features/category/components/category-form";

export function CreateCategoryFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

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

    const handleSubmit = () => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/category/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Category"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleBack}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <CategoryForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
