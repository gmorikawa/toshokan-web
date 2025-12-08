import { useMemo } from "react";
import type { Form } from "./use-form";
import ComboField, { type ComboFieldProps } from "../input/combo-field";

export interface FormComboFieldProps<Entity> extends ComboFieldProps<Entity> {
    form: Form;
}

export function FormComboField<Entity>({ form, property, options, ...others }: FormComboFieldProps<Entity>) {
    const handleChange = (entities: Entity[]): void => {
        form.updateValue(property, entities);
    };

    const value = form.getValue<Entity[]>(property);

    return useMemo(
        () => <ComboField
            property={property}
            onChange={handleChange}
            value={value}
            options={options}
            {...others}
        />,
        [value, options]
    );
}

export default FormComboField;
