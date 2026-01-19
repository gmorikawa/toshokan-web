import { ReadIcon } from "@shared/icons";

import { IconButton } from "@components/button/icon-button";

export interface ReadButtonProps {
    onClick?(): void;
}

export function ReadButton({ onClick }: ReadButtonProps) {
    return (
        <IconButton onClick={onClick} variant="text">
            <ReadIcon />
        </IconButton>
    );
}

export default ReadButton;