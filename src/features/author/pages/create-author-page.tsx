import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewAuthor } from "@features/author/types/author";
import { newAuthorValidator } from "@features/author/utils/validators";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useAuthorService } from "@features/author/hooks/author-service";
import { AuthorForm } from "@features/author/components/author-form";

import { useAlert } from "@components/feedback/alert/controller";

import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";
import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";

import { BackIcon } from "@shared/icons";

export function CreateAuthorPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useAuthorService();

    const form = useForm<NewAuthor>({
        default: {
            fullname: "",
            biography: ""
        },
        validator: newAuthorValidator,
        onSubmit: async (entity: NewAuthor) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/author/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });


    function handleBack(): void {
        navigate.to("/app/author/list");
    }


    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Author"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <AuthorForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateAuthorPage;
