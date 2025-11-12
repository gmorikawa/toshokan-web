import {
    Button
} from '@chakra-ui/react';

type TextAlign = "center" | "right" | "left";

interface TextButtonProps extends React.PropsWithChildren {
    align?: TextAlign;
    selected?: boolean;
    onSubmit?(e: React.MouseEvent<HTMLButtonElement>): void;
}

function TextButton({ align, selected, onSubmit, children }: TextButtonProps) {
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        (onSubmit) && (onSubmit(e));
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
            justifyContent={aligmentMapper(align)}
            onClick={handleSubmit}
        >
            {children}
        </Button>
    );
}

export { TextButton };
export type { TextButtonProps };
export default TextButton;