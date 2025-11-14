import {
    Button,
    Icon
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

type TextAlign = "center" | "right" | "left";
type ButtonVariant = "solid" | "outline" | "text";

interface ActionButtonProps extends React.PropsWithChildren, ThemeProps {
    variant?: ButtonVariant;
    align?: TextAlign;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;

    onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

function ActionButton({ variant, align, leftIcon, rightIcon, onClick, palette, children }: ActionButtonProps) {
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

    const variantMapper = (variant?: ButtonVariant): any => {
        switch (variant) {
            case "solid": return "solid";
            case "outline": return "outline";
            case "text": return "ghost";
            default: return "center";
        }
    };

    return (
        <Button
            variant={variantMapper(variant)}
            justifyContent={aligmentMapper(align)}
            onClick={handleClick}
            colorPalette={palette ?? "primary"}
        >
            {leftIcon && (<Icon>{leftIcon}</Icon>)}
            {children}
            {rightIcon && (<Icon>{rightIcon}</Icon>)}
        </Button>
    );
}

export { ActionButton };
export type { ActionButtonProps };
export default ActionButton;