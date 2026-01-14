import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewUser } from "@features/user/types/user";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { newUserValidator } from "@features/user/utils/validators";
import { CreateUserForm } from "@features/user/components/create-user-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useUserService } from "@features/user/hooks/user-service";

import { ActionButton } from "@components/button/action-button";
import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@shared/icons";

export function CreateUserPage() {
    const authorization = useAuthorization("ADMIN");

    function handleSubmit() {
        form.submit();
    }
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

    function handleBack(): void {
        navigate.to("/app/user/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="User"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <CreateUserForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateUserPage;
