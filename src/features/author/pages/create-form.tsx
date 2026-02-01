import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import type { NewAuthor } from "@features/author/types/author";
import { newAuthorValidator } from "@features/author/utils/validators";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useAuthorService } from "@features/author/hooks/author-service";
import { AuthorForm } from "@features/author/components/author-form";

export function AuthorCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");
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

    const handleSubmit = () => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/author/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Author"
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
                <AuthorForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
