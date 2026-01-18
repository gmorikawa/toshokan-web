import { DeleteIcon } from "@shared/icons";

import { IconButton } from "@components/button/icon-button";

export interface DeleteButtonProps {
    onClick?(): void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
    return (
        <IconButton onClick={onClick} variant="text" palette="danger">
            <DeleteIcon />
        </IconButton>
    );
}

export default DeleteButton;