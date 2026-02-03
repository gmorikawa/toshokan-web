import { DownloadIcon } from "@shared/icons";

import { IconButton, type IconButtonProps } from "@components/button/icon-button";

export interface DownloadButtonProps extends IconButtonProps { }

export function DownloadButton({ ...props }: DownloadButtonProps) {
    return (
        <IconButton
            {...props}
            variant="text"
            palette="primary"
        >
            <DownloadIcon />
        </IconButton>
    );
}
