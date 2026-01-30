import { DownloadIcon } from "@shared/icons";

import { IconButton } from "@components/button/icon-button";

export interface DownloadButtonProps {
    onClick?(): void;
}

export function DownloadButton({ onClick }: DownloadButtonProps) {
    return (
        <IconButton onClick={onClick} variant="text">
            <DownloadIcon />
        </IconButton>
    );
}
