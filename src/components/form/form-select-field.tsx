import { useMemo } from "react";
import type { Form } from "./use-form";
import SelectField, { type SelectFieldProps } from "../input/select-field";

interface FormSelectFieldProps<Entity> extends SelectFieldProps<Entity> {
    form: Form;
}

function FormSelectField<Entity>({ form, property, options, ...others }: FormSelectFieldProps<Entity>) {
    const handleChange = (entity: Entity): void => {
        form.updateValue(property, entity);
    };

    const value = form.getValue<string>(property);

    return useMemo(
        () => <SelectField
            property={property}
            onChange={handleChange}
            value={value}
            options={options}
            {...others}
        />,
        [value, options]
    );
}

export { FormSelectField };
export type { FormSelectFieldProps };
export default FormSelectField;
