import { useMemo } from "react";
import TextField, { type TextFieldProps } from "../input/text-field";
import type { Form } from "./use-form";

interface FormTextFieldProps extends TextFieldProps {
    form: Form;
}

function FormTextField({ form, property, ...others }: FormTextFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.updateValue(property, e.target.value);
    };

    const value = form.getValue<string | number>(property);

    return useMemo(
        () => <TextField
            property={property}
            onChange={handleChange}
            value={value}
            {...others}
        />,
        [value]
    );
}

export { FormTextField };
export type { FormTextFieldProps };
export default FormTextField;
