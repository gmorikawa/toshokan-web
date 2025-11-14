import { useMemo } from "react";
import type { Form } from "./use-form";
import RadioField, { type RadioFieldProps } from "../input/radio-field";

interface FormRadioFieldProps extends RadioFieldProps {
    form: Form;
}

function FormRadioField({ form, property, ...others }: FormRadioFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.updateValue(property, e.target.value);
    };

    const value = form.getValue<string>(property);

    return useMemo(
        () => <RadioField
            property={property}
            onChange={handleChange}
            value={value}
            {...others}
        />,
        [value]
    );
}

export { FormRadioField };
export type { FormRadioFieldProps };
export default FormRadioField;
