import {
    Button
} from '@chakra-ui/react';

type TextAlign = "center" | "right" | "left";

interface OutlineButtonProps extends React.PropsWithChildren {
    align?: TextAlign;
    onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

function OutlineButton({ align, onClick, children }: OutlineButtonProps) {
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
        >
            {children}
        </Button>
    );
}

export { OutlineButton };
export type { OutlineButtonProps };
export default OutlineButton;