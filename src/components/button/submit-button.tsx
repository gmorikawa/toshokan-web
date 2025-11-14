import {
    Button
} from '@chakra-ui/react';
import type { ThemeProps } from '..';

interface SubmitButtonProps extends React.PropsWithChildren, ThemeProps {
    onSubmit?(e: React.MouseEvent<HTMLButtonElement>): void;
}

function SubmitButton({ onSubmit, palette, children }: SubmitButtonProps) {
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        (onSubmit) && (onSubmit(e));
    };

    return (
        <Button
            colorScheme="blue"
            width="full"
            mt={4}
            onClick={handleSubmit}
            colorPalette={palette ?? "primary"}
        >
            {children}
        </Button>
    );
}

export { SubmitButton };
export type { SubmitButtonProps };
export default SubmitButton;