import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";

import type { Category } from "@features/category/types/category";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { categoryValidator } from "@features/category/utils/validators";
import { CategoryForm } from "@features/category/components/category-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useCategoryService } from "@features/category/hooks/category-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@shared/icons";

type ParamsWithId = {
    id?: string;
}

export function UpdateCategoryPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();
    const { id } = useParams<ParamsWithId>();

    const service = useCategoryService();

    const form = useForm<Category>({
        default: {
            id: "",
            name: ""
        },
        validator: categoryValidator,
        onSubmit: async (entity: Category) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                navigate.to("/app/category/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
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

    function handleBack(): void {
        navigate.to("/app/category/list");
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

            <ApplicationContent authorization={authorization}>
                <CategoryForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateCategoryPage;
