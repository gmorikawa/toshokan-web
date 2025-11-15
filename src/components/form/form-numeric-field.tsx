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

    const value = form.getValue<number>(property);

    return useMemo(
        () => <NumericField
            property={property}
            onChange={handleChange}
            value={value}
            {...others}
        />,
        [value]
    );
}

export { FormNumericField };
export type { FormNumericFieldProps };
export default FormNumericField;
