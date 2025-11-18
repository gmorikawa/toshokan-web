import { useMemo } from "react";
import TextField, { type TextFieldProps } from "../input/text-field";
import type { Form } from "./use-form";

interface FormTextFieldProps extends TextFieldProps {
    form: Form;
}

function FormTextField({ form, property, ...others }: FormTextFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.onChange(property, e.target.value);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.onBlur(property, e.target.value);
    };

    const value = form.getValue<string | number>(property);
    const error = form.getError(property);

    return useMemo(
        () => <TextField
            property={property}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            error={error}
            {...others}
        />,
        [value, error]
    );
}

export { FormTextField };
export type { FormTextFieldProps };
export default FormTextField;
