import { UpdateIcon } from "@shared/icons";

import { IconButton } from "@components/button/icon-button";

export interface UpdateButtonProps {
    onClick?(): void;
}

export function UpdateButton({ onClick }: UpdateButtonProps) {
    return (
        <IconButton onClick={onClick} variant="text">
            <UpdateIcon />
        </IconButton>
    );
}
