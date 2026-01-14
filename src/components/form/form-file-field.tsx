import { useMemo } from "react";
import FileField, { type FileFieldProps } from "../input/file-field";
import type { Form } from "./use-form";
import type { BinaryFile } from "@shared/file/types/binary-file";

export interface FormFileFieldProps extends FileFieldProps {
    form: Form;
}

export function FormFileField({ form, property, ...others }: FormFileFieldProps) {
    const handleChange = (binary?: BinaryFile): void => {
        form.updateValue(property, binary);
    };

    return useMemo(
        () => <FileField
            property={property}
            onChange={handleChange}
            {...others}
        />,
        []
    );
}

export default FormFileField;
