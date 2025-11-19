import type { NewUser } from "@/entities/models/user";
import { newUserValidator } from "@/entities/validators/user/new-user.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import UserService from "@/services/user-service";

import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import BoxContainer from "@/components/container/box-container";

import CreateUserForm from "@/features/user/components/create-user-form";

import { BackIcon } from "@/fragments/icons";

export function CreateUserPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<UserService>(UserService, { includeAuthorization: true });

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
                router.navigateTo("/app/user/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        router.navigateTo("/app/user/list");
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

            <ApplicationContent>
                <CreateUserForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateUserPage;
