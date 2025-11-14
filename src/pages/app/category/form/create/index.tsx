import type { NewCategory } from "@/entities/models/category";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import CategoryForm from "../form";

import { BackIcon } from "@/fragments/icons";

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
                <CategoryForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateCategoryFormPage;
