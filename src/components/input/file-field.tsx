import {
    FileUpload,
} from '@chakra-ui/react';
import type { ThemeProps } from '..';
import ActionButton from '../button/action-button';
import { UploadIcon } from '@/fragments/icons';
import type { BinaryFile } from '@/entities/binary-file';

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
