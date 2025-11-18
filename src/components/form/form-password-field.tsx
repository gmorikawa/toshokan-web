import { useMemo } from "react";
import PasswordField, { type PasswordFieldProps } from "../input/password-field";
import type { Form } from "./use-form";

interface FormPasswordFieldProps extends PasswordFieldProps {
    form: Form;
}

function FormPasswordField({ form, property, ...others }: FormPasswordFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.onChange(property, e.target.value);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.onBlur(property, e.target.value);
    };

    const value = form.getValue<string | number>(property);
    const error = form.getError(property);

    console.log("FormPasswordField render:", { property, value, error });

    return useMemo(
        () => <PasswordField
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

export { FormPasswordField };
export type { FormPasswordFieldProps };
export default FormPasswordField;
