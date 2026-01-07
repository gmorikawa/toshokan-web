import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewUser } from "@features/user/types/user";
import { newUserValidator } from "@features/user/utils/validators";
import { AdminUserForm } from "@features/configuration/components/admin-user-form";

import { useForm } from "@components/form/use-form";
import { useAlert } from "@components/feedback/use-alert";
import { useService } from "@/services/use-service";

import { Environment } from "@/config/environment";
import { ConfigurationService } from "@/services/configuration-service";

import { BorderedContainer } from "@components/container/bordered-container";
import { BoxContainer } from "@components/container/box-container";
import { CentralizedContainer } from "@components/container/centralized-container";
import { StackContainer } from "@components/container/stack-container";

import { Logo } from "@/layout/logo";

export function FirstAccessPage() {
    document.title = `First Access - ${Environment.APPLICATION_NAME}`;

    const alert = useAlert();
    const navigate = useNavigator();
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
                navigate.to("/login");
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
