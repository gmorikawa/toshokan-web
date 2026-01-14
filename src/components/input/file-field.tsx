import { FileUpload } from "@chakra-ui/react";

import type { BinaryFile } from "@shared/file/types/binary-file";
import { UploadIcon } from "@shared/icons";

import type { ThemeProps } from "@components/index";
import { ActionButton } from "@components/button/action-button";

export interface FileFieldProps extends ThemeProps {
    property: string;
    placeholder?: string;
    required?: boolean;

    onChange?(binary?: BinaryFile): void;
}

export function FileField({ property, required, onChange, palette }: FileFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        (onChange) && (onChange(e.target.files?.[0]));
    };

    return (
        <FileUpload.Root
            id={property}
            name={property}
            required={required}
            colorPalette={palette ?? "primary"}
            onChange={handleChange}
        >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
                <ActionButton variant="outline" leftIcon={<UploadIcon />}>
                    Select file
                </ActionButton>
            </FileUpload.Trigger>
            <FileUpload.List />
        </FileUpload.Root>
    );
}

export default FileField;
