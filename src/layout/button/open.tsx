import { OpenIcon } from "@shared/icons";

import { IconButton } from "@components/button/icon-button";

export interface OpenButtonProps {
    onClick?(): void;
}

export function OpenButton({ onClick }: OpenButtonProps) {
    return (
        <IconButton onClick={onClick} variant="text">
            <OpenIcon />
        </IconButton>
    );
}

export default OpenButton;