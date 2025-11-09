import {
    Button
} from '@chakra-ui/react';

interface SubmitButtonProps extends React.PropsWithChildren {}

function SubmitButton({ children }: SubmitButtonProps) {
    return (
        <Button
            colorScheme="blue"
            width="full"
            mt={4}
        >
            {children}
        </Button>
    );
}

export { SubmitButton };
export type { SubmitButtonProps };
export default SubmitButton;