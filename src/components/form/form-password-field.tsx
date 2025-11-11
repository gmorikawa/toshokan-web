import { useMemo } from "react";
import PasswordField, { type PasswordFieldProps } from "../input/password-field";
import type { Form } from "./use-form";

interface FormPasswordFieldProps extends PasswordFieldProps {
    form: Form;
}

function FormPasswordField({ form, property, ...others }: FormPasswordFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.updateValue(property, e.target.value);
    };

    const value = form.getValue<string>(property);

    return useMemo(
        () => <PasswordField
            property={property}
            onChange={handleChange}
            value={value}
            {...others}
        />,
        [value]
    );
}

export { FormPasswordField };
export type { FormPasswordFieldProps };
export default FormPasswordField;
