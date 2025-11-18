import {
    Field,
    Input,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

export interface NumericFieldProps extends ThemeProps {
    label: string;
    property: string;
    value?: number;
    placeholder?: string;
    required?: boolean;
    error?: string;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function NumericField({ label, property, value, placeholder, required, error, onChange, onBlur, palette }: NumericFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onBlur) && (onBlur(e));
    }

    return (
        <Field.Root
            id={property}
            required={required}
            colorPalette={palette ?? "primary"}
            invalid={Boolean(error)}
        >
            <Field.Label>{label}</Field.Label>

            <Input
                name={property}
                type="text"
                value={value ?? ""}
                placeholder={placeholder ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <Field.ErrorText>
                {error}
            </Field.ErrorText>
        </Field.Root>
    );
}

export default NumericField;
