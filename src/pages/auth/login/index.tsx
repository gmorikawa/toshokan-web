import SubmitButton from '@/components/button/submit-button';
import BorderedContainer from '@/components/container/bordered-container';
import CentralizedContainer from '@/components/container/centralized-container';
import StackContainer from '@/components/container/stack-container';
import PasswordField from '@/components/form/password-field';
import TextField from '@/components/form/text-field';

import useAuthentication from '@/hooks/auth/useAuthentication';
import useAlert from "@/hooks/feedback/useAlert";
import useRouter from '@/hooks/router/useRouter';

function LoginPage() {
    const alert = useAlert();
    const router = useRouter();
    const authentication = useAuthentication();

    const handleLogin = (_: React.MouseEvent) => {
        authentication.login()
            .then(() => {
                router.navigateTo("/dashboard");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        authentication.updateUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        authentication.updatePassword(e.target.value);
    };

    return (
        <CentralizedContainer parentHeight="100vh">
            <BorderedContainer width="500px">
                <StackContainer spacing={4}>
                    <TextField
                        label="Username"
                        property="username"
                        value={authentication.username}
                        placeholder="Enter your username"
                        onChange={handleUsernameChange}
                        required
                    />

                    <PasswordField
                        label="Password"
                        property="password"
                        value={authentication.password}
                        placeholder="Enter your password"
                        onChange={handlePasswordChange}
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
