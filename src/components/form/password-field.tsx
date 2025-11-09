import usePassword from '@/hooks/auth/usePassword';
import {
    Box,
    Field,
    Input,
    IconButton,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordFieldProps {
    label: string;
    property: string;
    placeholder?: string;
    required?: boolean;
}

function PasswordField({ label, property, placeholder, required }: PasswordFieldProps) {
    const password = usePassword();

    const handleChangePasswordVisibility = (_: React.MouseEvent) => {
        password.toggleVisibility();
    };

    return (
        <Field.Root id={property} required={required}>
            <Field.Label>{label}</Field.Label>
            <Box position="relative" width="100%">
                <Input
                    name={property}
                    type={password.visible ? 'text' : 'password'}
                    placeholder={placeholder ?? ""}
                />
                <Box position="absolute" right="1" top="1">
                    <IconButton
                        size="sm"
                        aria-label={password.visible ? 'Hide password' : 'Show password'}
                        variant="ghost"
                        onClick={handleChangePasswordVisibility}
                    >
                        {password.visible ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                </Box>
            </Box>
        </Field.Root>
    );
}

export { PasswordField };
export type { PasswordFieldProps };
export default PasswordField;
