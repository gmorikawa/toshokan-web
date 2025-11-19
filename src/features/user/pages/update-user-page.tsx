import type { User } from "@/entities/models/user";
import { userValidator } from "@/entities/validators/user/user.validator";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import UpdateUserForm from "@/features/user/components/update-user-form";

import { BackIcon } from "@/fragments/icons";

type ParamsWithId = {
    id?: string;
}

export function UpdateUserFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<UserService>(UserService, { includeAuthorization: true });

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
                    router.navigateTo("/app/user/list");
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

    function handleSubmit() {
        form.submit();
    }

    function handleBack(): void {
        router.navigateTo("/app/user/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="User"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <UpdateUserForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateUserFormPage;
