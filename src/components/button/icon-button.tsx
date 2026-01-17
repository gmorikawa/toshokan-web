import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import type { ThemeProps } from '..';

type TextAlign = "center" | "right" | "left";
type ButtonVariant = "solid" | "outline" | "text";

export interface IconButtonProps extends React.PropsWithChildren, ThemeProps {
    variant?: ButtonVariant;
    align?: TextAlign;

    onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

export function IconButton({ variant, align, onClick, palette, children }: IconButtonProps) {
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
            default: return "solid";
        }
    };

    return (
        <ChakraIconButton
            variant={variantMapper(variant)}
            justifyContent={aligmentMapper(align)}
            onClick={handleClick}
            colorPalette={palette ?? "primary"}
        >
            {children}
        </ChakraIconButton>
    );
}

export default IconButton;