import usePassword from '@/hooks/auth/use-password';
import {
    Box,
    Field,
    Input,
    IconButton,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { ThemeProps } from '..';

export interface PasswordFieldProps extends ThemeProps {
    label: string;
    property: string;
    value?: string | number;
    placeholder?: string;
    required?: boolean;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function PasswordField({ label, property, value, placeholder, required, onChange, palette }: PasswordFieldProps) {
    const password = usePassword();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    const handleChangePasswordVisibility = (_: React.MouseEvent) => {
        password.toggleVisibility();
    };

    return (
        <Field.Root id={property} required={required} colorPalette={palette ?? "primary"}>
            <Field.Label>{label}</Field.Label>
            <Box position="relative" width="100%">
                <Input
                    name={property}
                    value={value}
                    type={password.visible ? 'text' : 'password'}
                    placeholder={placeholder ?? ""}
                    onChange={handleChange}
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

export default PasswordField;
