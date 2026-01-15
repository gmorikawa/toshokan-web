import { useMemo } from "react";
import NumericField, { type NumericFieldProps } from "../input/numeric-field";
import type { Form } from "./use-form";

interface FormNumericFieldProps extends NumericFieldProps {
    form: Form;
}

function FormNumericField({ form, property, ...others }: FormNumericFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            form.updateValue(property, null);
        } else {
            form.updateValue(property, value);
        }
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            form.onBlur(property, null);
        } else {
            form.onBlur(property, value);
        }
    };

    const value = form.getValue<number>(property);
    const error = form.getError(property);

    return useMemo(
        () => <NumericField
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

export { FormNumericField };
export type { FormNumericFieldProps };
export default FormNumericField;
