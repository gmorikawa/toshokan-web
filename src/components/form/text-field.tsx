import {
    Field,
    Input,
} from '@chakra-ui/react';

interface TextFieldProps {
    label: string;
    property: string;
    placeholder?: string;
    required?: boolean;
}

function TextField({ label, property, placeholder, required }: TextFieldProps) {
    return (
        <Field.Root id={property} required={required}>
            <Field.Label>{label}</Field.Label>

            <Input
                name={property}
                type="text"
                placeholder={placeholder ?? ""}
                autoComplete='username'
            />
        </Field.Root>
    );
}

export { TextField };
export type { TextFieldProps };
export default TextField;
