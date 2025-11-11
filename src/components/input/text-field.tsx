import {
    Field,
    Input,
} from '@chakra-ui/react';

interface TextFieldProps {
    label: string;
    property: string;
    value?: string | number;
    placeholder?: string;
    required?: boolean;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

function TextField({ label, property, value, placeholder, required, onChange }: TextFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e));
    };

    return (
        <Field.Root id={property} required={required}>
            <Field.Label>{label}</Field.Label>

            <Input
                name={property}
                type="text"
                value={value}
                placeholder={placeholder ?? ""}
                onChange={handleChange}
            />
        </Field.Root>
    );
}

export { TextField };
export type { TextFieldProps };
export default TextField;
