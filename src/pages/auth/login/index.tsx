import SubmitButton from '@/components/button/submit-button';
import BorderedContainer from '@/components/container/bordered-container';
import CentralizedContainer from '@/components/container/centralized-container';
import StackContainer from '@/components/container/stack-container';
import PasswordField from '@/components/form/password-field';
import TextField from '@/components/form/text-field';

function LoginPage() {
    return (
        <CentralizedContainer parentHeight="100vh">
            <BorderedContainer width="500px">
                <StackContainer spacing={4}>
                    <TextField
                        label="Username"
                        property="username"
                        placeholder="Enter your username"
                        required
                    />

                    <PasswordField
                        label="Password"
                        property="password"
                        placeholder="Enter your password"
                        required
                    />

                    <SubmitButton>
                        Sign In
                    </SubmitButton>
                </StackContainer>
            </BorderedContainer>
        </CentralizedContainer>
    );
}

export default LoginPage;
