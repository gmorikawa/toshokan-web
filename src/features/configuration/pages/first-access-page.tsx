import type { NewUser } from "@/features/user/types/user";
import { newUserValidator } from "@/features/user/validators/new-user.validator";

import useForm from "@/components/form/use-form";
import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";

import Environment from "@/config/environment";
import ConfigurationService from "@/services/configuration-service";

import BorderedContainer from "@/components/container/bordered-container";
import BoxContainer from "@/components/container/box-container";
import CentralizedContainer from "@/components/container/centralized-container";
import StackContainer from "@/components/container/stack-container";

import { Logo } from "@/layout/logo";
import AdminUserForm from "../components/admin-user-form";

export function FirstAccessPage() {
    document.title = `First Access - ${Environment.APPLICATION_NAME}`;

    const alert = useAlert();
    const router = useRouter();
    const service = useService<ConfigurationService>(ConfigurationService);

    const form = useForm<NewUser>({
        default: {
            fullname: "",
            username: "",
            email: "",
            password: "",
            role: "ADMIN",
            status: "ACTIVE",
        },
        validator: newUserValidator,
        onSubmit: async (entity: NewUser) => {
            if (!form.isValid()) return;
            try {
                await service.configureAdminUser(entity);
                router.navigateTo("/login");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    return (
        <CentralizedContainer height="100vh">
            <BorderedContainer width="500px">
                <StackContainer spacing={4}>
                    <BoxContainer justifyContent="center" display="flex">
                        <Logo width={250} />
                    </BoxContainer>

                    <AdminUserForm form={form} />
                </StackContainer>
            </BorderedContainer>
        </CentralizedContainer>
    );
}

export default FirstAccessPage;
