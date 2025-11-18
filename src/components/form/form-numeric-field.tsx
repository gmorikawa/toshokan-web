import { useMemo } from "react";
import NumericField, { type NumericFieldProps } from "../input/numeric-field";
import type { Form } from "./use-form";

interface FormNumericFieldProps extends NumericFieldProps {
    form: Form;
}

function FormNumericField({ form, property, ...others }: FormNumericFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.updateValue(property, e.target.value);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        form.onBlur(property, e.target.value);
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
