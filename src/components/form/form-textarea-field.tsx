import { useMemo } from "react";
import TextareaField, { type TextareaFieldProps } from "../input/textarea-field";
import type { Form } from "./use-form";

export interface FormTextareaFieldProps extends TextareaFieldProps {
    form: Form;
}

export function FormTextareaField({ form, property, ...others }: FormTextareaFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        form.onChange(property, e.target.value);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        form.onBlur(property, e.target.value);
    };

    const value = form.getValue<string | number>(property);
    const error = form.getError(property);

    return useMemo(
        () => <TextareaField
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

export default FormTextareaField;
