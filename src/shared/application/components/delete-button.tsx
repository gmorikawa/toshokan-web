import { DeleteIcon } from "@shared/icons";

import { IconButton, type IconButtonProps } from "@components/button/icon-button";

export interface DeleteButtonProps extends IconButtonProps { }

export function DeleteButton({ ...props }: DeleteButtonProps) {
    return (
        <IconButton
            {...props}
            variant="text"
            palette="danger"

        >
            <DeleteIcon />
        </IconButton>
    );
}
