import {
    Field,
    Input,
    InputGroup,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

export interface TextFieldProps extends ThemeProps {
    label?: string;
    property: string;
    value?: string | number;
    placeholder?: string;
    required?: boolean;
    error?: string;

    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function TextField({ label, property, value, placeholder, required, error, onChange, onBlur, palette, startIcon, endIcon }: TextFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onBlur) && (onBlur(e));
    };

    return (
        <Field.Root
            id={property}
            required={required}
            colorPalette={palette ?? "primary"}
            invalid={Boolean(error)}
        >
            <Field.Label>
                {label}
                <Field.RequiredIndicator />
            </Field.Label>

            <InputGroup startElement={startIcon} endElement={endIcon}>
                <Input
                    name={property}
                    type="text"
                    value={value}
                    placeholder={placeholder ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </InputGroup>

            <Field.ErrorText>
                {error}
            </Field.ErrorText>
        </Field.Root>
    );
}

export default TextField;
