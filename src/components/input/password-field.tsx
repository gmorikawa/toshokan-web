import usePassword from '@/components/input/use-password';
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
    error?: string;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function PasswordField({ label, property, value, placeholder, required, error, onChange, onBlur, palette }: PasswordFieldProps) {
    const password = usePassword();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onBlur) && (onBlur(e));
    }

    const handleChangePasswordVisibility = (_: React.MouseEvent) => {
        password.toggleVisibility();
    };

    return (
        <Field.Root
            id={property}
            required={required}
            colorPalette={palette ?? "primary"}
            invalid={Boolean(error)}
        >
            <Field.Label>{label}</Field.Label>
            <Box position="relative" width="100%">
                <Input
                    name={property}
                    value={value}
                    type={password.visible ? 'text' : 'password'}
                    placeholder={placeholder ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
            <Field.ErrorText>
                {error}
            </Field.ErrorText>
        </Field.Root>
    );
}

export default PasswordField;
