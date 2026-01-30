import { useEffect } from "react";

import { useNavigator } from "@shared/router/hooks/navigator";
import { useParams } from "@shared/router/hooks/params";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { User } from "@features/user/types/user";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useUserService } from "@features/user/hooks/user-service";
import { userValidator } from "@features/user/utils/validators";
import { UpdateUserForm } from "@features/user/components/update-user-form";

type ParamsWithId = {
    id?: string;
}

export function UpdateUserFormPage() {
    const authorization = useAuthorization("ADMIN");

    const { id } = useParams<ParamsWithId>();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useUserService();
    const form = useForm<User>({
        default: {
            id: "",
            username: "",
            password: "",
            email: "",
            role: "READER",
            status: "ACTIVE",
            fullname: ""
        },
        validator: userValidator,
        onSubmit: (entity: User) => {
            service.update(entity)
                .then(() => {
                    navigate.to("/app/user/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: User) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    }

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/user/list");
    };

    useEffect(() => {
        loadEntity();
    }, []);

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
                <UpdateUserForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
