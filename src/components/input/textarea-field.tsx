import {
    Field,
    Textarea,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

export interface TextareaFieldProps extends ThemeProps {
    label: string;
    property: string;
    value?: string | number;
    placeholder?: string;
    required?: boolean;
    error?: string;

    rows?: number;
    allowResize?: boolean;

    onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    onBlur?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export function TextareaField({ label, property, value, placeholder, required, error, allowResize, onChange, onBlur, palette, rows }: TextareaFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        (onChange) && (onChange(e));
    };

    const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
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

            <Textarea
                resize={allowResize ? "vertical" : "none"}
                placeholder={placeholder ?? ""}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={rows}
            />

            <Field.ErrorText>
                {error}
            </Field.ErrorText>
        </Field.Root>
    );
}

export default TextareaField;
