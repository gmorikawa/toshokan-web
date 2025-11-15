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

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function NumericField({ label, property, value, placeholder, required, onChange, palette }: NumericFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    return (
        <Field.Root id={property} required={required} colorPalette={palette ?? "primary"}>
            <Field.Label>{label}</Field.Label>

            <Input
                name={property}
                type="text"
                value={value ?? ""}
                placeholder={placeholder ?? ""}
                onChange={handleChange}
            />
        </Field.Root>
    );
}

export default NumericField;
