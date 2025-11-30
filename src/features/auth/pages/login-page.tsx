import useAuthentication from '@/features/auth/hooks/use-authentication';
import useForm from '@/components/form/use-form';
import useAlert from "@/components/feedback/use-alert";
import useRouter from '@/hooks/router/use-router';

import SubmitButton from '@/components/button/submit-button';
import BorderedContainer from '@/components/container/bordered-container';
import CentralizedContainer from '@/components/container/centralized-container';
import StackContainer from '@/components/container/stack-container';
import FormPasswordField from '@/components/form/form-password-field';
import FormTextField from '@/components/form/form-text-field';
import Environment from '@/config/environment';
import { Logo } from '@/layout/logo';
import BoxContainer from '@/components/container/box-container';

export function LoginPage() {
    document.title = `Login - ${Environment.APPLICATION_NAME}`;

    const form = useForm({
        default: {
            username: "",
            password: "",
        }
    });

    const alert = useAlert();
    const router = useRouter();
    const authentication = useAuthentication();

    const handleLogin = () => {
        const { username, password } = form.entity;
        authentication.login(username, password)
            .then(() => {
                router.navigateTo("/app/topic/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    return (
        <CentralizedContainer height="100vh">
            <BorderedContainer width="500px">
                <StackContainer spacing={4}>
                    <BoxContainer justifyContent="center" display="flex">
                        <Logo width={250} />
                    </BoxContainer>
                    <FormTextField
                        form={form}
                        label="Username"
                        property="username"
                        placeholder="Enter your username"
                    />

                    <FormPasswordField
                        form={form}
                        label="Password"
                        property="password"
                        placeholder="Enter your password"
                    />

                    <SubmitButton onSubmit={handleLogin}>
                        Sign In
                    </SubmitButton>
                </StackContainer>
            </BorderedContainer>
        </CentralizedContainer>
    );
}

export default LoginPage;
