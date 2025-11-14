import {
    Button
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

type TextAlign = "center" | "right" | "left";

interface OutlineButtonProps extends React.PropsWithChildren, ThemeProps {
    align?: TextAlign;
    onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

function OutlineButton({ align, onClick, palette, children }: OutlineButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        (onClick) && (onClick(e));
    };

    const aligmentMapper = (align?: TextAlign): string => {
        switch (align) {
            case "left": return "flex-start";
            case "center": return "center";
            case "right": return "flex-end";
            default: return "center";
        }
    };

    return (
        <Button
            variant="outline"
            justifyContent={aligmentMapper(align)}
            onClick={handleClick}
            colorPalette={palette ?? "primary"}
        >
            {children}
        </Button>
    );
}

export { OutlineButton };
export type { OutlineButtonProps };
export default OutlineButton;