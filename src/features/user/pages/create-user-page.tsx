import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { NewUser } from "@features/user/types/user";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useUserService } from "@features/user/hooks/user-service";
import { newUserValidator } from "@features/user/utils/validators";
import { CreateUserForm } from "@features/user/components/create-user-form";

export function CreateUserFormPage() {
    const authorization = useAuthorization("ADMIN");

    const alert = useAlert();
    const navigate = useNavigator();
    const service = useUserService();
    const form = useForm<NewUser>({
        default: {
            username: "",
            password: "",
            email: "",
            role: "READER",
            status: "ACTIVE",
            fullname: ""
        },
        validator: newUserValidator,
        onSubmit: async (entity: NewUser) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/user/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/user/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="User"
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
                <CreateUserForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
