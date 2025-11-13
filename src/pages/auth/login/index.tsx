import useForm from '@/components/form/use-form';
import useAuthentication from '@/hooks/auth/use-authentication';
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from '@/hooks/router/use-router';

import SubmitButton from '@/components/button/submit-button';
import BorderedContainer from '@/components/container/bordered-container';
import CentralizedContainer from '@/components/container/centralized-container';
import StackContainer from '@/components/container/stack-container';
import FormPasswordField from '@/components/form/form-password-field';
import FormTextField from '@/components/form/form-text-field';

export function LoginPage() {
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
        <CentralizedContainer parentHeight="100vh">
            <BorderedContainer width="500px">
                <StackContainer spacing={4}>
                    <FormTextField
                        form={form}
                        label="Username"
                        property="username"
                        placeholder="Enter your username"
                        required
                    />

                    <FormPasswordField
                        form={form}
                        label="Password"
                        property="password"
                        placeholder="Enter your password"
                        required
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
