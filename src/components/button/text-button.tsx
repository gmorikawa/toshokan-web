import {
    Button,
    Icon
} from '@chakra-ui/react';

type TextAlign = "center" | "right" | "left";

interface TextButtonProps extends React.PropsWithChildren {
    align?: TextAlign;
    selected?: boolean;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;

    onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

function TextButton({ align, selected, leftIcon, rightIcon, onClick, children }: TextButtonProps) {
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
    }

    return (
        <Button
            variant={selected ? "subtle" : "ghost"}
            colorPalette="green"
            justifyContent={aligmentMapper(align)}
            onClick={handleClick}
        >
            {leftIcon && (<Icon>{leftIcon}</Icon>)}
            {children}
            {rightIcon && (<Icon>{rightIcon}</Icon>)}
        </Button>
    );
}

export { TextButton };
export type { TextButtonProps };
export default TextButton;